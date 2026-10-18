"use client";

import { useEffect, useState } from "react";
import {
  Eye,
  CheckCircle2,
  AlertCircle,
  Megaphone,
  Phone,
  Trophy,
  Calendar,
  Mic2,
  Newspaper,
} from "lucide-react";
import type { SiteContentPayload } from "@/types/radio";
import { useSiteContent } from "@/context/SiteContentContext";
import { CrmLoginCard } from "@/app/crm/CrmLoginCard";
import { CrmHeaderBar } from "@/app/crm/CrmHeaderBar";
import {
  HeroSectionEditor,
  ContactsSectionEditor,
} from "@/app/crm/CrmSectionEditors";
import { ChartsSectionEditor } from "@/app/crm/CrmChartsEditor";
import {
  ShowsSectionEditor,
  TeamSectionEditor,
} from "@/app/crm/CrmCollectionEditors";
import { NewsSectionEditor } from "@/app/crm/CrmNewsEditor";
import { CrmPreviewModal } from "@/app/crm/CrmPreviewModal";

type CrmSectionTab = "hero" | "contacts" | "charts" | "shows" | "team" | "news";

const CRM_TABS: ReadonlyArray<{
  readonly id: CrmSectionTab;
  readonly label: string;
  readonly icon: typeof Megaphone;
}> = [
  { id: "hero", label: "Hero & Notice", icon: Megaphone },
  { id: "contacts", label: "Contacts & Hotlines", icon: Phone },
  { id: "charts", label: "Top 10 Charts", icon: Trophy },
  { id: "shows", label: "Shows Schedule", icon: Calendar },
  { id: "team", label: "Personalities", icon: Mic2 },
  { id: "news", label: "News Bulletins", icon: Newspaper },
];

export default function CrmStudioPage() {
  const {
    publishedContent,
    draftContent,
    publishedVersion,
    sessionUser,
    isCheckingAuth,
    setIsPreviewMode,
    refreshCmsState,
    saveDraftToServer,
    publishToMainWebsite,
    discardDraftOnServer,
    logoutFromCrm,
  } = useSiteContent();

  const [localDraft, setLocalDraft] =
    useState<SiteContentPayload>(draftContent);
  const [activeTab, setActiveTab] = useState<CrmSectionTab>("hero");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState<boolean>(false);
  const [statusBanner, setStatusBanner] = useState<{
    readonly type: "success" | "error";
    readonly text: string;
  } | null>(null);

  useEffect(() => {
    setLocalDraft(draftContent);
  }, [draftContent]);

  if (isCheckingAuth) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-khulumani-greenLight text-khulumani-greenDark text-xs font-extrabold">
          Verifying server session...
        </div>
      </div>
    );
  }

  if (!sessionUser) {
    return <CrmLoginCard onLoginSuccess={refreshCmsState} />;
  }

  const hasLocalOrDraftChanges =
    JSON.stringify(localDraft) !== JSON.stringify(publishedContent);

  const handleSaveDraft = async (): Promise<boolean> => {
    setIsSaving(true);
    setStatusBanner(null);
    const result = await saveDraftToServer(localDraft);
    setIsSaving(false);
    if (!result.ok) {
      setStatusBanner({
        type: "error",
        text: result.error ?? "Could not save draft.",
      });
      return false;
    }
    setStatusBanner({
      type: "success",
      text: "Draft saved on server! Click 'Preview Before Publishing' to inspect before going live.",
    });
    return true;
  };

  const handleOpenPreview = async () => {
    const saved = await handleSaveDraft();
    if (saved) setIsPreviewModalOpen(true);
  };

  const handleLaunchFullSitePreview = async () => {
    await saveDraftToServer(localDraft);
    setIsPreviewMode(true);
    setIsPreviewModalOpen(false);
  };

  const handlePublishLive = async () => {
    setIsPublishing(true);
    setStatusBanner(null);
    const result = await publishToMainWebsite(localDraft);
    setIsPublishing(false);
    if (!result.ok) {
      setStatusBanner({
        type: "error",
        text: result.error ?? "Failed to publish.",
      });
      return;
    }
    setIsPreviewModalOpen(false);
    setStatusBanner({
      type: "success",
      text: "Published live to the main website! All visitors now see the updated content.",
    });
  };

  const handleDiscard = async () => {
    const result = await discardDraftOnServer();
    if (result.ok) {
      setLocalDraft(publishedContent);
      setStatusBanner({
        type: "success",
        text: "Draft changes discarded. Reverted to current live website content.",
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <CrmHeaderBar
        email={sessionUser.email}
        publishedVersion={publishedVersion}
        hasLocalOrDraftChanges={hasLocalOrDraftChanges}
        isSaving={isSaving}
        isPublishing={isPublishing}
        onSaveDraft={handleSaveDraft}
        onOpenPreview={handleOpenPreview}
        onPublishLive={handlePublishLive}
        onDiscard={handleDiscard}
        onLogout={logoutFromCrm}
      />

      {statusBanner && (
        <div
          role="status"
          aria-live="polite"
          className={`p-4 rounded-2xl border text-xs sm:text-sm font-bold flex items-center justify-between gap-3 ${
            statusBanner.type === "success"
              ? "bg-khulumani-greenLight border-khulumani-green text-khulumani-greenDark"
              : "bg-red-50 border-red-300 text-red-800"
          }`}
        >
          <div className="flex items-center gap-2">
            {statusBanner.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-khulumani-green shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            )}
            <span>{statusBanner.text}</span>
          </div>
          <button
            type="button"
            onClick={() => setStatusBanner(null)}
            className="text-xs underline font-extrabold"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-2xl border border-khulumani-border shadow-sm">
        {CRM_TABS.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                active
                  ? "bg-khulumani-green text-white shadow-sm"
                  : "text-khulumani-ink hover:bg-khulumani-greenLight"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <form
        action="/api/cms/content"
        method="POST"
        onSubmit={(e) => {
          e.preventDefault();
          void handleOpenPreview();
        }}
        className="rounded-3xl bg-white border border-khulumani-border p-6 sm:p-8 shadow-sm"
      >
        {activeTab === "hero" && (
          <HeroSectionEditor
            hero={localDraft.hero}
            onChange={(hero) => setLocalDraft({ ...localDraft, hero })}
          />
        )}
        {activeTab === "contacts" && (
          <ContactsSectionEditor
            contacts={localDraft.contacts}
            onChange={(contacts) => setLocalDraft({ ...localDraft, contacts })}
          />
        )}
        {activeTab === "charts" && (
          <ChartsSectionEditor
            charts={localDraft.charts}
            onChange={(charts) => setLocalDraft({ ...localDraft, charts })}
          />
        )}
        {activeTab === "shows" && (
          <ShowsSectionEditor
            shows={localDraft.shows}
            onChange={(shows) => setLocalDraft({ ...localDraft, shows })}
          />
        )}
        {activeTab === "team" && (
          <TeamSectionEditor
            team={localDraft.team}
            onChange={(team) => setLocalDraft({ ...localDraft, team })}
          />
        )}
        {activeTab === "news" && (
          <NewsSectionEditor
            news={localDraft.news}
            onChange={(news) => setLocalDraft({ ...localDraft, news })}
          />
        )}

        <div className="mt-8 pt-5 border-t border-khulumani-border flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-khulumani-muted font-semibold">
            Tip: Always preview your draft changes before publishing to the main
            website.
          </span>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => void handleSaveDraft()}
              className="px-4 py-2.5 rounded-xl bg-khulumani-greenLight text-khulumani-greenDark text-xs font-extrabold hover:bg-khulumani-green hover:text-white transition-colors"
            >
              Save Draft
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-khulumani-green text-white text-xs font-extrabold hover:bg-khulumani-greenDark shadow-sm"
            >
              <Eye className="w-4 h-4" />
              <span>Save &amp; Preview Changes</span>
            </button>
          </div>
        </div>
      </form>

      <CrmPreviewModal
        isOpen={isPreviewModalOpen}
        draft={localDraft}
        published={publishedContent}
        isPublishing={isPublishing}
        onClose={() => setIsPreviewModalOpen(false)}
        onPublish={handlePublishLive}
        onLaunchFullSitePreview={handleLaunchFullSitePreview}
      />
    </div>
  );
}
