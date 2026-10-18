"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  Sparkles,
  ExternalLink,
  X,
  CheckCircle2,
  Megaphone,
  Trophy,
  Phone,
  Newspaper,
} from "lucide-react";
import type { SiteContentPayload } from "@/types/radio";

interface CrmPreviewModalProps {
  readonly isOpen: boolean;
  readonly draft: SiteContentPayload;
  readonly published: SiteContentPayload;
  readonly isPublishing: boolean;
  readonly onClose: () => void;
  readonly onPublish: () => Promise<void>;
  readonly onLaunchFullSitePreview: (targetPath: string) => Promise<void>;
}

export function CrmPreviewModal({
  isOpen,
  draft,
  published,
  isPublishing,
  onClose,
  onPublish,
  onLaunchFullSitePreview,
}: CrmPreviewModalProps) {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"draft" | "published">("draft");

  if (!isOpen) return null;

  const displayed = viewMode === "draft" ? draft : published;
  const changedSections: string[] = [];
  if (JSON.stringify(draft.hero) !== JSON.stringify(published.hero))
    changedSections.push("Homepage Hero");
  if (JSON.stringify(draft.contacts) !== JSON.stringify(published.contacts))
    changedSections.push("Contacts & Hotlines");
  if (JSON.stringify(draft.shows) !== JSON.stringify(published.shows))
    changedSections.push("Shows Schedule");
  if (JSON.stringify(draft.charts) !== JSON.stringify(published.charts))
    changedSections.push("Top 10 Charts");
  if (JSON.stringify(draft.team) !== JSON.stringify(published.team))
    changedSections.push("Personalities");
  if (JSON.stringify(draft.news) !== JSON.stringify(published.news))
    changedSections.push("News Bulletins");

  const handleOpenTabPreview = async (path: string) => {
    await onLaunchFullSitePreview(path);
    router.push(path);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="crm-preview-modal-title"
      className="fixed inset-0 z-[70] bg-black/65 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="bg-khulumani-bg border-2 border-khulumani-green rounded-3xl max-w-5xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-khulumani-greenDark via-khulumani-green to-khulumani-teal px-6 py-4 text-white flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-black/25 text-amber-300">
              <Eye className="w-5 h-5" />
            </span>
            <div>
              <h2
                id="crm-preview-modal-title"
                className="text-lg sm:text-xl font-black"
              >
                Pre-Publish Website Preview
              </h2>
              <p className="text-xs text-white/85">
                Inspect your staged changes below or launch interactive
                full-site preview before publishing live.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex rounded-xl bg-black/25 p-1 border border-white/20">
              <button
                type="button"
                onClick={() => setViewMode("draft")}
                className={`px-3 py-1 rounded-lg text-xs font-extrabold ${
                  viewMode === "draft"
                    ? "bg-white text-khulumani-greenDark"
                    : "text-white/85"
                }`}
              >
                Staged Draft
              </button>
              <button
                type="button"
                onClick={() => setViewMode("published")}
                className={`px-3 py-1 rounded-lg text-xs font-extrabold ${
                  viewMode === "published"
                    ? "bg-white text-khulumani-greenDark"
                    : "text-white/85"
                }`}
              >
                Current Live
              </button>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-black/25 hover:bg-black/40 text-white"
              aria-label="Close preview"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="bg-white border-b border-khulumani-border px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-extrabold text-khulumani-ink">
              Staged Modifications:
            </span>
            {changedSections.length === 0 ? (
              <span className="px-2.5 py-0.5 rounded-full bg-khulumani-greenLight text-khulumani-greenDark font-bold">
                Matches Current Live Website
              </span>
            ) : (
              changedSections.map((sec) => (
                <span
                  key={sec}
                  className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-extrabold"
                >
                  {sec}
                </span>
              ))
            )}
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-bold text-khulumani-muted">
              Full-Page Preview:
            </span>
            {[
              { label: "Home", path: "/" },
              { label: "Schedule", path: "/shows-schedule" },
              { label: "Charts", path: "/charts-elementor" },
              { label: "Contacts", path: "/contacts" },
            ].map((tab) => (
              <button
                key={tab.path}
                type="button"
                onClick={() => void handleOpenTabPreview(tab.path)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-khulumani-greenLight hover:bg-khulumani-green text-khulumani-greenDark hover:text-white font-extrabold transition-colors"
              >
                <span>{tab.label}</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <div className="rounded-3xl bg-gradient-to-r from-khulumani-greenDark via-khulumani-green to-khulumani-teal text-white p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-xl">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/25 text-amber-300 text-[11px] font-extrabold uppercase">
                <Megaphone className="w-3 h-3" />
                {displayed.hero.badge}
              </span>
              <h3 className="text-2xl font-black">{displayed.hero.headline}</h3>
              <p className="text-xs text-white/90">{displayed.hero.subtitle}</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-black/25 border border-white/20 max-w-xs text-xs">
              <strong className="text-amber-300 block mb-0.5 uppercase text-[10px]">
                Studio Notice
              </strong>
              {displayed.hero.announcement}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-white border border-khulumani-border p-4 space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-khulumani-green uppercase">
                <Trophy className="w-3.5 h-3.5" />
                Top 3 Chart Preview
              </div>
              {displayed.charts.slice(0, 3).map((track) => (
                <div
                  key={track.position}
                  className="p-2.5 rounded-xl bg-khulumani-bg flex items-center justify-between text-xs"
                >
                  <div className="truncate pr-2">
                    <span className="font-black text-khulumani-greenDark mr-1.5">
                      #{track.position}
                    </span>
                    <span className="font-bold text-khulumani-ink">
                      {track.title}
                    </span>
                  </div>
                  <span className="font-mono font-bold text-khulumani-green shrink-0">
                    {track.votes}
                  </span>
                </div>
              ))}
            </div>

            <div className="rounded-2xl bg-white border border-khulumani-border p-4 space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-khulumani-green uppercase">
                <Phone className="w-3.5 h-3.5" />
                Contacts Tab Preview
              </div>
              <div className="p-2.5 rounded-xl bg-khulumani-bg space-y-1 text-xs">
                <div className="font-black text-khulumani-ink">
                  {displayed.contacts.heroTitle}
                </div>
                <div className="text-[11px] text-khulumani-muted line-clamp-2">
                  {displayed.contacts.heroSubtitle}
                </div>
                <div className="pt-1 font-mono font-bold text-khulumani-greenDark">
                  Tel: {displayed.contacts.phone} • WA:{" "}
                  {displayed.contacts.mobile}
                </div>
                <div className="text-[11px] font-bold text-khulumani-ink">
                  {displayed.contacts.email}
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white border border-khulumani-border p-4 space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-khulumani-green uppercase">
                <Newspaper className="w-3.5 h-3.5" />
                Latest News Preview
              </div>
              {displayed.news.slice(0, 2).map((item) => (
                <div
                  key={item.id}
                  className="p-2.5 rounded-xl bg-khulumani-bg space-y-1 text-xs"
                >
                  <span className="text-[10px] font-extrabold text-khulumani-green uppercase">
                    {item.category}
                  </span>
                  <div className="font-black text-khulumani-ink line-clamp-1">
                    {item.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white border-t border-khulumani-border px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => void handleOpenTabPreview("/")}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-khulumani-greenLight hover:bg-khulumani-green text-khulumani-greenDark hover:text-white text-xs font-extrabold transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Open Full-Screen Interactive Website Preview</span>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-khulumani-border text-xs font-bold text-khulumani-ink hover:bg-khulumani-bg"
            >
              Keep Editing Draft
            </button>
            <button
              type="button"
              disabled={isPublishing}
              onClick={() => void onPublish()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-khulumani-green hover:bg-khulumani-greenDark text-white text-xs font-black shadow-md shadow-khulumani-green/25 transition-all disabled:opacity-60"
            >
              <Sparkles className="w-4 h-4" />
              <span>
                {isPublishing
                  ? "Publishing..."
                  : "Confirm & Publish to Main Website"}
              </span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
