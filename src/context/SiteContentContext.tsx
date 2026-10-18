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
    } catch {
      // Ignore storage quota errors
    }
  }, []);

  const refreshCmsState = useCallback(async () => {
    setIsCheckingAuth(true);
    try {
      const cmsRes = await fetch("/api/cms/content?mode=cms", {
        credentials: "include",
        cache: "no-store",
      });
      if (cmsRes.ok) {
        const data = (await cmsRes.json()) as {
          snapshot: CmsSnapshot;
          user: CmsSessionUser;
        };
        setSessionUser(data.user);
        applySnapshot(data.snapshot);
        setIsCheckingAuth(false);
        return;
      }

      setSessionUser(null);
      setIsPreviewModeState(false);

      const pubRes = await fetch("/api/cms/content", { cache: "no-store" });
      if (pubRes.ok) {
        const pubData = (await pubRes.json()) as {
          published: SiteContentPayload;
          publishedVersion: number;
          lastPublishedAt: string;
        };
        setPublishedContent(pubData.published);
        setDraftContent(pubData.published);
        setPublishedVersion(pubData.publishedVersion);
        setLastPublishedAt(pubData.lastPublishedAt);
      }
    } catch {
      try {
        const cached = window.localStorage.getItem(PUBLISHED_CACHE_KEY);
        if (cached)
          setPublishedContent(JSON.parse(cached) as SiteContentPayload);
      } catch {
        // Ignore
      }
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

  const saveDraftToServer = useCallback(
    async (
      nextDraft: SiteContentPayload
    ): Promise<{ ok: boolean; error?: string }> => {
      try {
        const res = await fetch("/api/cms/content", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(nextDraft),
        });
        const data = (await res.json()) as {
          snapshot?: CmsSnapshot;
          error?: string;
        };
        if (!res.ok || !data.snapshot) {
          return {
            ok: false,
            error: data.error ?? "Failed to save draft changes.",
          };
        }
        applySnapshot(data.snapshot);
        return { ok: true };
      } catch {
        return { ok: false, error: "Network error while saving draft." };
      }
    },
    [applySnapshot]
  );

  const publishToMainWebsite = useCallback(
    async (
      optionalDraft?: SiteContentPayload
    ): Promise<{ ok: boolean; error?: string }> => {
      try {
        const res = await fetch("/api/cms/content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            action: "publish",
            draft: optionalDraft ?? draftContent,
          }),
        });
        const data = (await res.json()) as {
          snapshot?: CmsSnapshot;
          error?: string;
        };
        if (!res.ok || !data.snapshot) {
          return {
            ok: false,
            error: data.error ?? "Failed to publish content to main website.",
          };
        }
        applySnapshot(data.snapshot);
        return { ok: true };
      } catch {
        return {
          ok: false,
          error: "Network error while publishing to main website.",
        };
      }
    },
    [applySnapshot, draftContent]
  );

  const discardDraftOnServer = useCallback(async (): Promise<{
    ok: boolean;
    error?: string;
  }> => {
    try {
      const res = await fetch("/api/cms/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ action: "discard" }),
      });
      const data = (await res.json()) as {
        snapshot?: CmsSnapshot;
        error?: string;
      };
      if (!res.ok || !data.snapshot) {
        return { ok: false, error: data.error ?? "Failed to discard draft." };
      }
      applySnapshot(data.snapshot);
      return { ok: true };
    } catch {
      return { ok: false, error: "Network error while discarding draft." };
    }
  }, [applySnapshot]);

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
