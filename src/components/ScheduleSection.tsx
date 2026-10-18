"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, Mic2, Radio, ArrowRight } from "lucide-react";
import { DAY_NAMES, getShowsForDay, getBulawayoTime } from "@/lib/schedule";
import { useRadio } from "@/context/RadioPlayerContext";

interface ScheduleSectionProps {
  showViewAllLink?: boolean;
}

export function ScheduleSection({
  showViewAllLink = false,
}: ScheduleSectionProps) {
  const { day: currentCatDay } = getBulawayoTime();
  const [selectedDay, setSelectedDay] = useState<number>(currentCatDay);
  const { currentShow } = useRadio();

  const dayShows = getShowsForDay(selectedDay);

  return (
    <div className="rounded-3xl bg-white border border-khulumani-border p-6 sm:p-8 shadow-sm">
      {/* Header & Day Selector Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-khulumani-border">
        <div>
          <div className="flex items-center gap-2 text-xs font-extrabold text-khulumani-green uppercase tracking-wider">
            <Radio className="w-3.5 h-3.5" />
            Khulumani FM 95.0 Lineup
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-khulumani-ink mt-1">
            Weekly Broadcast Schedule
          </h2>
        </div>

        {/* 7-Day Selector Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-khulumani-bg border border-khulumani-border">
          {DAY_NAMES.map((d) => {
            const isSelected = selectedDay === d.day;
            const isToday = currentCatDay === d.day;
            return (
              <button
                key={d.day}
                onClick={() => setSelectedDay(d.day)}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all ${
                  isSelected
                    ? "bg-khulumani-green text-white shadow-sm"
                    : "text-khulumani-ink hover:bg-khulumani-greenLight"
                }`}
              >
                <span>{d.label}</span>
                {isToday && (
                  <span
                    className={`ml-1.5 inline-block w-1.5 h-1.5 rounded-full ${
                      isSelected ? "bg-amber-300" : "bg-khulumani-green"
                    }`}
                    title="Today in Bulawayo"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Shows Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {dayShows.map((show) => {
          const isCurrent =
            selectedDay === currentCatDay && currentShow.id === show.id;
          return (
            <div
              key={show.id}
              className={`rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                isCurrent
                  ? "bg-khulumani-greenLight/80 border-2 border-khulumani-green shadow-md"
                  : "bg-khulumani-bg/60 border-khulumani-border hover:border-khulumani-green/50 hover:bg-white"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 text-xs font-mono font-extrabold text-khulumani-greenDark">
                    <Clock className="w-3.5 h-3.5 text-khulumani-green" />
                    {show.timeLabel}
                  </span>
                  {isCurrent ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-khulumani-tangelo text-white">
                      Now Playing
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white border border-khulumani-border text-khulumani-muted">
                      {show.genre}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-black text-khulumani-ink leading-snug">
                  {show.title}
                </h3>

                <div className="flex items-center gap-1.5 mt-1.5 text-xs font-bold text-khulumani-greenDark">
                  <Mic2 className="w-3.5 h-3.5 text-khulumani-green shrink-0" />
                  <span>With {show.presenter}</span>
                </div>

                <p className="text-xs text-khulumani-muted mt-3 leading-relaxed">
                  {show.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-khulumani-border/70 flex items-center justify-between text-[11px] font-semibold text-khulumani-muted">
                <span>{show.daysLabel}</span>
                <span className="text-khulumani-greenDark font-bold">
                  95.0 FM
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {showViewAllLink && (
        <div className="mt-6 pt-5 border-t border-khulumani-border flex items-center justify-between">
          <p className="text-xs text-khulumani-muted">
            All broadcast times are in Central Africa Time (CAT / Bulawayo).
          </p>
          <Link
            href="/shows-schedule"
            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-khulumani-green hover:text-khulumani-greenDark"
          >
            <span>Open Full Schedule Page</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
