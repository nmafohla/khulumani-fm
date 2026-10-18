"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Eye,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  RefreshCw,
  XCircle,
} from "lucide-react";
import { useSiteContent } from "@/context/SiteContentContext";

const PREVIEW_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shows-schedule", label: "Schedule" },
  { href: "/charts-elementor", label: "Charts" },
  { href: "/team-members", label: "Personalities" },
  { href: "/news", label: "News" },
  { href: "/contacts", label: "Contacts" },
] as const;

export function PreviewModeBar() {
  const pathname = usePathname();
  const {
    sessionUser,
    isPreviewMode,
    previewComparisonMode,
    hasUnpublishedChanges,
    publishedVersion,
    setIsPreviewMode,
    setPreviewComparisonMode,
    publishToMainWebsite,
  } = useSiteContent();

  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [publishNotice, setPublishNotice] = useState<string | null>(null);

  if (!sessionUser || !isPreviewMode || pathname.startsWith("/crm")) {
    return null;
  }

  const handlePublishNow = async () => {
    setIsPublishing(true);
    setPublishNotice(null);
    const result = await publishToMainWebsite();
    setIsPublishing(false);
    if (result.ok) {
      setPublishNotice("Published live to main website!");
      window.setTimeout(() => setPublishNotice(null), 4000);
    } else {
      setPublishNotice(result.error ?? "Publish failed.");
    }
  };

  return (
    <div className="sticky top-0 z-[60] bg-[#141414]/95 backdrop-blur-2xl text-white shadow-xl border-b-2 border-[#119e45]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Status Badge & Mode Toggle */}
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#119e45]/20 border border-[#119e45]/50 text-[#4ade80] text-xs font-black uppercase tracking-wider">
            <Eye className="w-3.5 h-3.5" />
            {previewComparisonMode === "draft"
              ? "Previewing Unpublished Draft"
              : `Comparing Live Site (v${publishedVersion})`}
          </span>

          <div className="inline-flex rounded-xl bg-black/50 p-0.5 border border-white/15">
            <button
              type="button"
              onClick={() => setPreviewComparisonMode("draft")}
              className={`min-h-[34px] px-2.5 py-1 rounded-lg text-xs font-extrabold transition-colors ${
                previewComparisonMode === "draft"
                  ? "bg-[#119e45] text-white shadow-sm"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Draft Preview
            </button>
            <button
              type="button"
              onClick={() => setPreviewComparisonMode("published")}
              className={`min-h-[34px] px-2.5 py-1 rounded-lg text-xs font-extrabold transition-colors ${
                previewComparisonMode === "published"
                  ? "bg-[#119e45] text-white shadow-sm"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Current Live
            </button>
          </div>

          {publishNotice && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#119e45] text-white text-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {publishNotice}
            </span>
          )}
        </div>

        {/* Center: Page Switcher */}
        <div className="hidden xl:flex items-center gap-1 bg-white/5 border border-white/10 px-2 py-1 rounded-xl">
          <span className="text-[11px] font-bold text-white/75 px-1.5">
            Preview Tab:
          </span>
          {PREVIEW_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-2.5 py-1 rounded-lg text-xs font-extrabold transition-colors ${
                  active
                    ? "bg-[#119e45] text-white"
                    : "text-white/90 hover:bg-white/15"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/crm"
            className="min-h-[40px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-extrabold apple-spring active:scale-[0.96]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to CRM Editor</span>
          </Link>

          <button
            type="button"
            onClick={() => void handlePublishNow()}
            disabled={isPublishing || !hasUnpublishedChanges}
            className={`min-h-[40px] inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black shadow-md apple-spring active:scale-[0.96] ${
              hasUnpublishedChanges
                ? "bg-[#119e45] hover:bg-[#0d7e36] text-white"
                : "bg-white/20 text-white/60 cursor-not-allowed"
            }`}
          >
            {isPublishing ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Sparkles className="w-3.5 h-3.5" />
            )}
            <span>
              {hasUnpublishedChanges
                ? "Publish to Main Website"
                : "All Changes Live"}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setIsPreviewMode(false)}
            className="min-h-[40px] inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-red-600/80 text-white text-xs font-bold apple-spring active:scale-[0.96]"
            title="Exit Preview Mode"
          >
            <XCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exit</span>
          </button>
        </div>
      </div>
    </div>
  );
}
