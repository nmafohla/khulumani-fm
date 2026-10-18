"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, Mic2, ArrowRight } from "lucide-react";
import { DAY_NAMES, getBulawayoTime } from "@/lib/schedule";
import { useRadio } from "@/context/RadioPlayerContext";
import { useSiteContent } from "@/context/SiteContentContext";

interface ScheduleSectionProps {
  showViewAllLink?: boolean;
}

export function ScheduleSection({
  showViewAllLink = false,
}: ScheduleSectionProps) {
  const { day: currentCatDay } = getBulawayoTime();
  const [selectedDay, setSelectedDay] = useState<number>(currentCatDay);
  const { currentShow } = useRadio();
  const { activeContent } = useSiteContent();

  const dayShows = activeContent.shows
    .filter((show) => show.days.includes(selectedDay))
    .sort((a, b) => a.startHour - b.startHour);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-schedule-collage shadow-2xl border-2 border-[#141414]">
      {/* Dark contrast tint + Original Cassette Tape, Lightning & Headphones Grunge Overlay */}
      <div className="absolute inset-0 bg-[#0a120d]/70" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-schedule-grunge-overlay pointer-events-none opacity-95"
        aria-hidden="true"
      />

      <div className="relative z-10 px-5 sm:px-10 py-14 sm:py-16">
        {/* Skewed White Parallelogram "WEEKLY SCHEDULE" Header Badge */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="bg-white text-[#141414] font-black text-2xl sm:text-4xl uppercase tracking-wider px-10 py-3 clip-skew-badge shadow-xl border-b-4 border-[#119e45]">
            WEEKLY SCHEDULE
          </div>
        </div>

        {/* Full-Width Rounded Kelly-Green Day Selector Bar with Logo Black/White Active Pill */}
        <div
          className="max-w-5xl mx-auto rounded-3xl sm:rounded-full bg-[#119e45] p-2 shadow-xl border border-white/20 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5"
          role="tablist"
          aria-label="Select broadcast day"
        >
          {DAY_NAMES.map((d) => {
            const isSelected = selectedDay === d.day;
            const isToday = currentCatDay === d.day;
            return (
              <button
                key={d.day}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedDay(d.day)}
                className={`min-h-[44px] px-4 py-2.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider apple-spring active:scale-[0.96] flex items-center justify-center gap-1.5 ${
                  isSelected
                    ? "bg-[#141414] text-white shadow-md scale-[1.02] ring-2 ring-white/40"
                    : "text-white hover:bg-black/20"
                }`}
              >
                <span>{d.label}</span>
                {isToday && (
                  <span
                    className="inline-block w-2 h-2 rounded-full bg-white"
                    title="Today in Bulawayo (CAT)"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* 3-Column Logo-Matched Studio Show Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {dayShows.map((show) => {
            const isCurrent =
              selectedDay === currentCatDay && currentShow.id === show.id;
            return (
              <div
                key={show.id}
                className={`relative rounded-2xl overflow-hidden min-h-[250px] flex flex-col justify-between p-6 border apple-spring hover:-translate-y-1 shadow-xl ${
                  isCurrent
                    ? "border-2 border-[#4ade80] ring-2 ring-[#119e45]/70"
                    : "border-white/20"
                }`}
              >
                {/* Logo-Matched Bulawayo Skyline & Studio Microphone Card Background */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/apple-radio-hero.webp"
                  alt={show.title}
                  width={420}
                  height={260}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/75 to-black/45" />

                {/* Top Badge Row: Skewed Black "NOW PLAYING" Badge on Active Card */}
                <div className="relative z-10 flex items-center justify-between gap-2">
                  {isCurrent ? (
                    <span className="bg-white text-[#141414] font-black text-xs sm:text-sm uppercase tracking-wider px-5 py-1.5 clip-skew-badge shadow-md border-l-4 border-[#119e45]">
                      NOW PLAYING
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded bg-black/65 text-white text-[11px] font-bold uppercase tracking-wider border border-white/15">
                      95.0 FM LINEUP
                    </span>
                  )}

                  <span className="px-2.5 py-0.5 border border-[#22c55e] text-[#4ade80] bg-black/60 text-[11px] font-black uppercase tracking-widest">
                    {show.genre || "MIXED-BAG"}
                  </span>
                </div>

                {/* Center / Bottom Show Title & Time Slot */}
                <div className="relative z-10 mt-8 text-white">
                  <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white leading-tight drop-shadow">
                    {show.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 mt-2 text-xs font-extrabold text-[#4ade80]">
                    <span className="inline-flex items-center gap-1">
                      <Mic2 className="w-3.5 h-3.5 text-white" />
                      With {show.presenter}
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono text-white">
                      <Clock className="w-3.5 h-3.5 text-[#22c55e]" />
                      {show.timeLabel}
                    </span>
                  </div>

                  <p className="text-xs text-white/85 mt-2.5 leading-relaxed line-clamp-2">
                    {show.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {showViewAllLink && (
          <div className="mt-10 pt-5 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-white">
            <p className="text-xs font-semibold text-white/90">
              All broadcast times are in Central Africa Time (CAT / Bulawayo
              95.0 FM).
            </p>
            <Link
              href="/shows-schedule"
              className="min-h-[44px] inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#119e45] hover:bg-white hover:text-[#141414] text-white text-xs font-black uppercase tracking-wider apple-spring active:scale-[0.96] shadow-lg"
            >
              <span>Open Full Schedule Page</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
