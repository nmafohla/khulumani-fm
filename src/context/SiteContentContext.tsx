"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";
import type {
  CmsSessionUser,
  CmsSnapshot,
  SiteContentPayload,
} from "@/types/radio";
import { DEFAULT_SITE_CONTENT } from "@/lib/stationContent";

const PUBLISHED_CACHE_KEY = "khulumani_published_content_cache_v1";
const DRAFT_CACHE_KEY = "khulumani_draft_content_cache_v1";
const SNAPSHOT_CACHE_KEY = "khulumani_cms_snapshot_v1";

function readCachedSnapshot(): CmsSnapshot | null {
  try {
    const raw = window.localStorage.getItem(SNAPSHOT_CACHE_KEY);
    return raw ? (JSON.parse(raw) as CmsSnapshot) : null;
  } catch {
    return null;
  }
}

interface SiteContentContextValue {
  readonly activeContent: SiteContentPayload;
  readonly publishedContent: SiteContentPayload;
  readonly draftContent: SiteContentPayload;
  readonly hasUnpublishedChanges: boolean;
  readonly publishedVersion: number;
  readonly lastSavedDraftAt: string;
  readonly lastPublishedAt: string;
  readonly lastPublishedBy: string;
  readonly isPreviewMode: boolean;
  readonly previewComparisonMode: "draft" | "published";
  readonly sessionUser: CmsSessionUser | null;
  readonly isCheckingAuth: boolean;
  readonly setIsPreviewMode: (enabled: boolean) => void;
  readonly setPreviewComparisonMode: (mode: "draft" | "published") => void;
  readonly refreshCmsState: () => Promise<void>;
  readonly saveDraftToServer: (
    nextDraft: SiteContentPayload
  ) => Promise<{ ok: boolean; error?: string }>;
  readonly publishToMainWebsite: (
    optionalDraft?: SiteContentPayload
  ) => Promise<{ ok: boolean; error?: string }>;
  readonly discardDraftOnServer: () => Promise<{ ok: boolean; error?: string }>;
  readonly logoutFromCrm: () => Promise<void>;
}

const SiteContentContext = createContext<SiteContentContextValue | null>(null);

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [publishedContent, setPublishedContent] =
    useState<SiteContentPayload>(DEFAULT_SITE_CONTENT);
  const [draftContent, setDraftContent] =
    useState<SiteContentPayload>(DEFAULT_SITE_CONTENT);
  const [publishedVersion, setPublishedVersion] = useState<number>(1);
  const [lastSavedDraftAt, setLastSavedDraftAt] = useState<string>("");
  const [lastPublishedAt, setLastPublishedAt] = useState<string>("");
  const [lastPublishedBy, setLastPublishedBy] =
    useState<string>("Studio System");
  const [sessionUser, setSessionUser] = useState<CmsSessionUser | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);
  const [isPreviewMode, setIsPreviewModeState] = useState<boolean>(false);
  const [previewComparisonMode, setPreviewComparisonMode] = useState<
    "draft" | "published"
  >("draft");

  const hasUnpublishedChanges =
    JSON.stringify(publishedContent) !== JSON.stringify(draftContent);

  const applySnapshot = useCallback((snapshot: CmsSnapshot) => {
    setPublishedContent(snapshot.published);
    setDraftContent(snapshot.draft);
    setPublishedVersion(snapshot.publishedVersion);
    setLastSavedDraftAt(snapshot.lastSavedDraftAt);
    setLastPublishedAt(snapshot.lastPublishedAt);
    setLastPublishedBy(snapshot.lastPublishedBy);
    try {
      window.localStorage.setItem(
        PUBLISHED_CACHE_KEY,
        JSON.stringify(snapshot.published)
      );
      window.localStorage.setItem(
        DRAFT_CACHE_KEY,
        JSON.stringify(snapshot.draft)
      );
      window.localStorage.setItem(SNAPSHOT_CACHE_KEY, JSON.stringify(snapshot));
    } catch {
      // Ignore storage quota errors
    }
  }, []);

  const refreshCmsState = useCallback(async () => {
    setIsCheckingAuth(true);
    const cachedSnapshot = readCachedSnapshot();
    try {
      const res = await fetch("/api/cms/content", {
        credentials: "include",
        cache: "no-store",
      });
      if (res.ok) {
        const data = (await res.json()) as {
          published: SiteContentPayload;
          publishedVersion: number;
          lastPublishedAt: string;
          snapshot?: CmsSnapshot;
          user?: CmsSessionUser | null;
        };
        if (data.user && data.snapshot) {
          setSessionUser(data.user);
          applySnapshot(data.snapshot);
          return;
        }
        setSessionUser(null);
        setIsPreviewModeState(false);
        // Server response is always the single source of truth for public visitors
        setPublishedContent(data.published);
        setDraftContent(data.published);
        setPublishedVersion(data.publishedVersion);
        setLastPublishedAt(data.lastPublishedAt);
      }
    } catch {
      // Offline fallback only when network request fails
      if (cachedSnapshot) applySnapshot(cachedSnapshot);
    } finally {
      setIsCheckingAuth(false);
    }
  }, [applySnapshot]);

  useEffect(() => {
    void refreshCmsState();
  }, [refreshCmsState]);

  const setIsPreviewMode = useCallback(
    (enabled: boolean) => {
      if (!sessionUser) {
        setIsPreviewModeState(false);
        return;
      }
      setIsPreviewModeState(enabled);
      if (enabled) setPreviewComparisonMode("draft");
    },
    [sessionUser]
  );

  const mutateCms = useCallback(
    async (
      method: "PUT" | "POST",
      payload: unknown,
      fallbackError: string
    ): Promise<{ ok: boolean; error?: string }> => {
      try {
        const res = await fetch("/api/cms/content", {
          method,
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        });
        const data = (await res.json()) as {
          snapshot?: CmsSnapshot;
          error?: string;
        };
        if (!res.ok || !data.snapshot) {
          return { ok: false, error: data.error ?? fallbackError };
        }
        applySnapshot(data.snapshot);
        return { ok: true };
      } catch {
        return { ok: false, error: fallbackError };
      }
    },
    [applySnapshot]
  );

  const saveDraftToServer = useCallback(
    (nextDraft: SiteContentPayload) =>
      mutateCms("PUT", nextDraft, "Failed to save draft changes."),
    [mutateCms]
  );

  const publishToMainWebsite = useCallback(
    (optionalDraft?: SiteContentPayload) =>
      mutateCms(
        "POST",
        { action: "publish", draft: optionalDraft ?? draftContent },
        "Failed to publish content to main website."
      ),
    [draftContent, mutateCms]
  );

  const discardDraftOnServer = useCallback(
    () => mutateCms("POST", { action: "discard" }, "Failed to discard draft."),
    [mutateCms]
  );

  const logoutFromCrm = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    setSessionUser(null);
    setIsPreviewModeState(false);
    await refreshCmsState();
  }, [refreshCmsState]);

  const activeContent =
    sessionUser && isPreviewMode && previewComparisonMode === "draft"
      ? draftContent
      : publishedContent;

  return (
    <SiteContentContext.Provider
      value={{
        activeContent,
        publishedContent,
        draftContent,
        hasUnpublishedChanges,
        publishedVersion,
        lastSavedDraftAt,
        lastPublishedAt,
        lastPublishedBy,
        isPreviewMode,
        previewComparisonMode,
        sessionUser,
        isCheckingAuth,
        setIsPreviewMode,
        setPreviewComparisonMode,
        refreshCmsState,
        saveDraftToServer,
        publishToMainWebsite,
        discardDraftOnServer,
        logoutFromCrm,
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent(): SiteContentContextValue {
  const ctx = useContext(SiteContentContext);
  if (!ctx)
    throw new Error("useSiteContent must be used within a SiteContentProvider");
  return ctx;
}
