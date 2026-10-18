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
    <div className="relative overflow-hidden rounded-[32px] bg-[#0b110d] border-2 border-[#119e45]/50 text-white p-6 sm:p-8 shadow-2xl space-y-5">
      {/* Khulumani Logo-Matched Skyline Studio Backdrop */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/apple-radio-hero.webp"
        alt=""
        width={1280}
        height={400}
        className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b110d]/95 via-[#0d1c13]/85 to-[#0b110d]/92 pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-4">
          <div className="hidden sm:flex items-center justify-center px-3.5 py-2 rounded-2xl bg-white shadow-lg shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo.png"
              alt="Khulumani FM 95.0 Logo"
              width={116}
              height={60}
              className="h-11 w-auto object-contain"
            />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#119e45] text-white text-xs font-black uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                Montrose Broadcast CRM • {email}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/15 text-xs font-mono font-bold">
                Live v{publishedVersion}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                  hasLocalOrDraftChanges
                    ? "bg-white text-[#141414]"
                    : "bg-[#119e45]/25 border border-[#4ade80]/50 text-[#4ade80]"
                }`}
              >
                {hasLocalOrDraftChanges
                  ? "Unpublished Draft Changes"
                  : "Synced With Main Website"}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Khulumani FM 95.0 Content Studio
            </h1>
            <p className="text-xs sm:text-sm text-white/85 mt-1">
              Edit any website section below, save as a draft, preview how it
              looks on the live site, and publish when ready.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => void onLogout()}
          className="min-h-[44px] self-start lg:self-center inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold apple-spring active:scale-[0.96]"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      <div className="relative z-10 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            disabled={isSaving}
            onClick={() => void onSaveDraft()}
            className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-black uppercase tracking-wider apple-spring active:scale-[0.96]"
          >
            <Save className="w-4 h-4 text-[#4ade80]" />
            <span>{isSaving ? "Saving Draft..." : "1. Save Draft"}</span>
          </button>
          <button
            type="button"
            onClick={() => void onOpenPreview()}
            className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white hover:bg-neutral-200 text-[#141414] text-xs font-black uppercase tracking-wider shadow-lg apple-spring active:scale-[0.96]"
          >
            <Eye className="w-4 h-4 text-[#119e45]" />
            <span>2. Preview Before Publishing</span>
          </button>
          <button
            type="button"
            disabled={isPublishing}
            onClick={() => void onPublishLive()}
            className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#119e45] hover:bg-[#0d7e36] text-white text-xs font-black uppercase tracking-wider shadow-lg apple-spring active:scale-[0.96]"
          >
            <Sparkles className="w-4 h-4" />
            <span>
              {isPublishing ? "Publishing..." : "3. Publish to Main Website"}
            </span>
          </button>
        </div>

        {hasLocalOrDraftChanges && (
          <button
            type="button"
            onClick={() => void onDiscard()}
            className="min-h-[44px] inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-red-500/25 hover:bg-red-500/40 border border-red-400/30 text-white text-xs font-bold apple-spring active:scale-[0.96]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Discard Draft Changes</span>
          </button>
        )}
      </div>
    </div>
  );
}
