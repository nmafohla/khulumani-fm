"use client";

import {
  ShieldCheck,
  Eye,
  Save,
  Sparkles,
  RotateCcw,
  LogOut,
} from "lucide-react";

interface CrmHeaderBarProps {
  readonly email: string;
  readonly publishedVersion: number;
  readonly hasLocalOrDraftChanges: boolean;
  readonly isSaving: boolean;
  readonly isPublishing: boolean;
  readonly onSaveDraft: () => Promise<boolean>;
  readonly onOpenPreview: () => Promise<void>;
  readonly onPublishLive: () => Promise<void>;
  readonly onDiscard: () => Promise<void>;
  readonly onLogout: () => Promise<void>;
}

export function CrmHeaderBar({
  email,
  publishedVersion,
  hasLocalOrDraftChanges,
  isSaving,
  isPublishing,
  onSaveDraft,
  onOpenPreview,
  onPublishLive,
  onDiscard,
  onLogout,
}: CrmHeaderBarProps) {
  return (
    <div className="rounded-3xl bg-gradient-to-r from-khulumani-greenDark via-khulumani-green to-khulumani-teal text-white p-6 sm:p-8 shadow-lg space-y-5">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/25 text-amber-300 text-xs font-extrabold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              Montrose Broadcast CRM • {email}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-white/15 text-xs font-bold">
              Live Version v{publishedVersion}
            </span>
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-extrabold ${
                hasLocalOrDraftChanges
                  ? "bg-amber-400 text-khulumani-ink"
                  : "bg-emerald-950/60 text-emerald-200"
              }`}
            >
              {hasLocalOrDraftChanges
                ? "Unpublished Draft Changes"
                : "Synced With Main Website"}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Khulumani FM 95.0 Content Studio
          </h1>
          <p className="text-xs sm:text-sm text-white/90 mt-1">
            Edit any website section below, save as a draft, preview how it
            looks on the live site, and publish when ready.
          </p>
        </div>

        <button
          type="button"
          onClick={() => void onLogout()}
          className="self-start lg:self-center inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-black/25 hover:bg-black/40 text-white text-xs font-bold"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      <div className="pt-4 border-t border-white/20 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            disabled={isSaving}
            onClick={() => void onSaveDraft()}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black/25 hover:bg-black/40 text-white text-xs font-extrabold transition-colors"
          >
            <Save className="w-4 h-4 text-amber-300" />
            <span>{isSaving ? "Saving Draft..." : "1. Save Draft"}</span>
          </button>
          <button
            type="button"
            onClick={() => void onOpenPreview()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-300 hover:bg-amber-200 text-khulumani-ink text-xs font-black shadow-md transition-all"
          >
            <Eye className="w-4 h-4" />
            <span>2. Preview Before Publishing</span>
          </button>
          <button
            type="button"
            disabled={isPublishing}
            onClick={() => void onPublishLive()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-emerald-50 text-khulumani-greenDark text-xs font-black shadow-md transition-all"
          >
            <Sparkles className="w-4 h-4 text-khulumani-green" />
            <span>
              {isPublishing ? "Publishing..." : "3. Publish to Main Website"}
            </span>
          </button>
        </div>

        {hasLocalOrDraftChanges && (
          <button
            type="button"
            onClick={() => void onDiscard()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-500/30 hover:bg-red-500/45 text-white text-xs font-bold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Discard Draft Changes</span>
          </button>
        )}
      </div>
    </div>
  );
}
