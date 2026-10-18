import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import type { CmsSnapshot, SiteContentPayload } from "@/types/radio";
import { DEFAULT_SITE_CONTENT } from "@/lib/stationContent";

// shortcut: file-backed snapshot in os.tmpdir() for zero-config serverless/local persistence, upgrade to Postgres/DynamoDB for multi-region scale
const STORE_PATH = path.join(os.tmpdir(), "khulumani-cms-state.json");

let memorySnapshot: CmsSnapshot | null = null;

function createInitialSnapshot(): CmsSnapshot {
  const nowIso = new Date().toISOString();
  return {
    published: DEFAULT_SITE_CONTENT,
    draft: DEFAULT_SITE_CONTENT,
    hasUnpublishedChanges: false,
    publishedVersion: 1,
    lastSavedDraftAt: nowIso,
    lastPublishedAt: nowIso,
    lastPublishedBy: "Studio System",
  };
}

export function computeHasUnpublishedChanges(
  published: SiteContentPayload,
  draft: SiteContentPayload
): boolean {
  return JSON.stringify(published) !== JSON.stringify(draft);
}

export function getCmsSnapshot(): CmsSnapshot {
  if (memorySnapshot) {
    return memorySnapshot;
  }

  try {
    if (fs.existsSync(STORE_PATH)) {
      const raw = fs.readFileSync(STORE_PATH, "utf8");
      const parsed = JSON.parse(raw) as CmsSnapshot;
      if (parsed && parsed.published && parsed.draft) {
        memorySnapshot = parsed;
        return parsed;
      }
    }
  } catch {
    // Fall back to default initial snapshot if file is missing or unreadable
  }

  const initial = createInitialSnapshot();
  memorySnapshot = initial;
  return initial;
}

function persistSnapshot(snapshot: CmsSnapshot): CmsSnapshot {
  memorySnapshot = snapshot;
  try {
    fs.writeFileSync(STORE_PATH, JSON.stringify(snapshot, null, 2), "utf8");
  } catch {
    // Keep in-memory state if tmpdir write is unavailable
  }
  return snapshot;
}

/**
 * Saves new draft content without publishing it to the live public website.
 */
export function saveDraftContent(draft: SiteContentPayload): CmsSnapshot {
  const current = getCmsSnapshot();
  const hasUnpublishedChanges = computeHasUnpublishedChanges(
    current.published,
    draft
  );
  const next: CmsSnapshot = {
    ...current,
    draft,
    hasUnpublishedChanges,
    lastSavedDraftAt: new Date().toISOString(),
  };
  return persistSnapshot(next);
}

/**
 * Promotes the current draft (or provided validated draft) to published live website content.
 */
export function publishDraftToMainSite(
  actorEmail: string,
  optionalDraft?: SiteContentPayload
): CmsSnapshot {
  const current = getCmsSnapshot();
  const nextPublished = optionalDraft ?? current.draft;
  const nowIso = new Date().toISOString();
  const next: CmsSnapshot = {
    published: nextPublished,
    draft: nextPublished,
    hasUnpublishedChanges: false,
    publishedVersion: current.publishedVersion + 1,
    lastSavedDraftAt: nowIso,
    lastPublishedAt: nowIso,
    lastPublishedBy: actorEmail,
  };
  return persistSnapshot(next);
}

/**
 * Discards unpublished draft changes and reverts the draft back to the currently published content.
 */
export function discardDraftChanges(): CmsSnapshot {
  const current = getCmsSnapshot();
  const next: CmsSnapshot = {
    ...current,
    draft: current.published,
    hasUnpublishedChanges: false,
    lastSavedDraftAt: new Date().toISOString(),
  };
  return persistSnapshot(next);
}

export function resetCmsStoreForTests(): void {
  memorySnapshot = null;
  try {
    if (fs.existsSync(STORE_PATH)) {
      fs.unlinkSync(STORE_PATH);
    }
  } catch {
    // ignore
  }
}
