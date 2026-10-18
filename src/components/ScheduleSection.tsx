"use client";

import { useState } from "react";
import { Clock, Mic2, Radio } from "lucide-react";
import { KHULUMANI_SHOWS } from "@/lib/schedule";
import type { ShowScheduleItem } from "@/types/radio";

export function ScheduleSection() {
  const [selectedDayTab, setSelectedDayTab] = useState<
    "weekday" | "saturday" | "sunday"
  >("weekday");

  const filterShows = (
    shows: readonly ShowScheduleItem[]
  ): ShowScheduleItem[] => {
    if (selectedDayTab === "weekday") {
      return shows.filter((s) => s.days.some((d) => d >= 1 && d <= 5));
    }
    if (selectedDayTab === "saturday") {
      return shows.filter((s) => s.days.includes(6));
    }
    return shows.filter((s) => s.days.includes(0));
  };

  const currentList = filterShows(KHULUMANI_SHOWS);

  const formatHours = (start: number, end: number) => {
    const s = String(start).padStart(2, "0") + ":00";
    const e = String(end === 24 ? 0 : end).padStart(2, "0") + ":00";
    return `${s} - ${e}`;
  };

  return (
    <div className="rounded-3xl bg-station-card/60 border border-station-border p-6 sm:p-8">
      {/* Title & Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-station-border/60">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-station-gold uppercase tracking-wider">
            <Radio className="w-3.5 h-3.5" />
            Station Program Guide
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
            Official Broadcast Schedule
          </h3>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-station-dark border border-station-border self-stretch sm:self-auto">
          <button
            onClick={() => setSelectedDayTab("weekday")}
            className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedDayTab === "weekday"
                ? "bg-station-gold text-station-dark shadow-md"
                : "text-station-muted hover:text-white"
            }`}
          >
            Mon – Fri
          </button>
          <button
            onClick={() => setSelectedDayTab("saturday")}
            className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedDayTab === "saturday"
                ? "bg-station-gold text-station-dark shadow-md"
                : "text-station-muted hover:text-white"
            }`}
          >
            Saturday
          </button>
          <button
            onClick={() => setSelectedDayTab("sunday")}
            className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedDayTab === "sunday"
                ? "bg-station-gold text-station-dark shadow-md"
                : "text-station-muted hover:text-white"
            }`}
          >
            Sunday
          </button>
        </div>
      </div>

      {/* Shows Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {currentList.map((show) => (
          <div
            key={show.id}
            className="p-5 rounded-xl bg-station-dark/80 border border-station-border/70 hover:border-station-gold/40 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-station-gold">
                  <Clock className="w-3.5 h-3.5" />
                  {formatHours(show.startHour, show.endHour)} CAT
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-station-card text-station-muted">
                  {show.genre}
                </span>
              </div>

              <h4 className="text-base font-bold text-white tracking-tight">
                {show.title}
              </h4>

              <div className="flex items-center gap-1.5 mt-1 text-xs text-station-teal font-medium">
                <Mic2 className="w-3.5 h-3.5" />
                <span>{show.presenter}</span>
              </div>

              <p className="text-xs text-station-muted mt-2.5 leading-relaxed line-clamp-2">
                {show.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
