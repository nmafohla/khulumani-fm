"use client";

import { Plus, Trash2 } from "lucide-react";
import type { ShowScheduleItem, TeamMember } from "@/types/radio";
import { AVAILABLE_STUDIO_IMAGES } from "@/app/crm/CrmSectionEditors";

export function ShowsSectionEditor({
  shows,
  onChange,
}: {
  readonly shows: readonly ShowScheduleItem[];
  readonly onChange: (next: readonly ShowScheduleItem[]) => void;
}) {
  const updateShow = (index: number, patch: Partial<ShowScheduleItem>) => {
    onChange(
      shows.map((item, idx) => (idx === index ? { ...item, ...patch } : item))
    );
  };

  const addShow = () => {
    const newShow: ShowScheduleItem = {
      id: `custom-show-${Date.now()}`,
      slug: `custom-show-${Date.now()}`,
      title: "New Studio Show",
      presenter: "Studio Presenter",
      startHour: 10,
      endHour: 12,
      timeLabel: "10:00 am – 12:00 pm",
      daysLabel: "Monday to Friday",
      description:
        "Live interactive broadcast from Montrose Studios on 95.0 FM.",
      days: [1, 2, 3, 4, 5],
      genre: "Mixed Bag",
      image: "/images/show-banner.jpg",
    };
    onChange([newShow, ...shows]);
  };

  const removeShow = (index: number) => {
    if (shows.length <= 1) return;
    onChange(shows.filter((_, idx) => idx !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-black text-khulumani-ink">
          Shows &amp; Weekly Schedule ({shows.length} Editions)
        </h2>
        <button
          type="button"
          onClick={addShow}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-khulumani-green text-white text-xs font-extrabold hover:bg-khulumani-greenDark"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Show Edition</span>
        </button>
      </div>

      <div className="space-y-3 max-h-[540px] overflow-y-auto pr-1">
        {shows.map((show, idx) => (
          <div
            key={show.id}
            className="p-4 rounded-2xl bg-khulumani-bg/70 border border-khulumani-border space-y-3"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div>
                <label
                  htmlFor={`show-title-${show.id}`}
                  className="block text-[10px] font-bold uppercase text-khulumani-muted mb-0.5"
                >
                  Show Title
                </label>
                <input
                  id={`show-title-${show.id}`}
                  name={`showTitle_${show.id}`}
                  type="text"
                  value={show.title}
                  onChange={(e) => updateShow(idx, { title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-khulumani-border text-xs font-bold text-khulumani-ink"
                />
              </div>

              <div>
                <label
                  htmlFor={`show-presenter-${show.id}`}
                  className="block text-[10px] font-bold uppercase text-khulumani-muted mb-0.5"
                >
                  Presenter(s)
                </label>
                <input
                  id={`show-presenter-${show.id}`}
                  name={`showPresenter_${show.id}`}
                  type="text"
                  value={show.presenter}
                  onChange={(e) =>
                    updateShow(idx, { presenter: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white border border-khulumani-border text-xs text-khulumani-ink"
                />
              </div>

              <div>
                <label
                  htmlFor={`show-time-${show.id}`}
                  className="block text-[10px] font-bold uppercase text-khulumani-muted mb-0.5"
                >
                  Time Slot Label
                </label>
                <input
                  id={`show-time-${show.id}`}
                  name={`showTime_${show.id}`}
                  type="text"
                  value={show.timeLabel}
                  onChange={(e) =>
                    updateShow(idx, { timeLabel: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white border border-khulumani-border text-xs font-mono text-khulumani-ink"
                />
              </div>

              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <label
                    htmlFor={`show-days-${show.id}`}
                    className="block text-[10px] font-bold uppercase text-khulumani-muted mb-0.5"
                  >
                    Days Label
                  </label>
                  <input
                    id={`show-days-${show.id}`}
                    name={`showDays_${show.id}`}
                    type="text"
                    value={show.daysLabel}
                    onChange={(e) =>
                      updateShow(idx, { daysLabel: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-white border border-khulumani-border text-xs text-khulumani-ink"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeShow(idx)}
                  disabled={shows.length <= 1}
                  className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-40"
                  title="Remove show edition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor={`show-desc-${show.id}`}
                className="block text-[10px] font-bold uppercase text-khulumani-muted mb-0.5"
              >
                Show Description
              </label>
              <input
                id={`show-desc-${show.id}`}
                name={`showDesc_${show.id}`}
                type="text"
                value={show.description}
                onChange={(e) =>
                  updateShow(idx, { description: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl bg-white border border-khulumani-border text-xs text-khulumani-ink"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TeamSectionEditor({
  team,
  onChange,
}: {
  readonly team: readonly TeamMember[];
  readonly onChange: (next: readonly TeamMember[]) => void;
}) {
  const updateMember = (index: number, patch: Partial<TeamMember>) => {
    onChange(
      team.map((item, idx) => (idx === index ? { ...item, ...patch } : item))
    );
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-black text-khulumani-ink">
        On-Air Personalities &amp; Producers ({team.length})
      </h2>

      <div className="space-y-3 max-h-[540px] overflow-y-auto pr-1">
        {team.map((member, idx) => (
          <div
            key={member.id}
            className="p-4 rounded-2xl bg-khulumani-bg/70 border border-khulumani-border space-y-3"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label
                  htmlFor={`team-name-${member.id}`}
                  className="block text-[10px] font-bold uppercase text-khulumani-muted mb-0.5"
                >
                  Presenter Name
                </label>
                <input
                  id={`team-name-${member.id}`}
                  name={`teamName_${member.id}`}
                  type="text"
                  value={member.name}
                  onChange={(e) => updateMember(idx, { name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-khulumani-border text-xs font-bold text-khulumani-ink"
                />
              </div>

              <div>
                <label
                  htmlFor={`team-sched-${member.id}`}
                  className="block text-[10px] font-bold uppercase text-khulumani-muted mb-0.5"
                >
                  Schedule Summary
                </label>
                <input
                  id={`team-sched-${member.id}`}
                  name={`teamSched_${member.id}`}
                  type="text"
                  value={member.scheduleSummary}
                  onChange={(e) =>
                    updateMember(idx, { scheduleSummary: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white border border-khulumani-border text-xs text-khulumani-ink"
                />
              </div>

              <div>
                <label
                  htmlFor={`team-img-${member.id}`}
                  className="block text-[10px] font-bold uppercase text-khulumani-muted mb-0.5"
                >
                  Studio Image
                </label>
                <select
                  id={`team-img-${member.id}`}
                  name={`teamImg_${member.id}`}
                  value={member.image}
                  onChange={(e) => updateMember(idx, { image: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-khulumani-border text-xs text-khulumani-ink"
                >
                  {AVAILABLE_STUDIO_IMAGES.map((img) => (
                    <option key={img.value} value={img.value}>
                      {img.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor={`team-bio-${member.id}`}
                className="block text-[10px] font-bold uppercase text-khulumani-muted mb-0.5"
              >
                Presenter Bio
              </label>
              <input
                id={`team-bio-${member.id}`}
                name={`teamBio_${member.id}`}
                type="text"
                value={member.bio}
                onChange={(e) => updateMember(idx, { bio: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white border border-khulumani-border text-xs text-khulumani-ink"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
