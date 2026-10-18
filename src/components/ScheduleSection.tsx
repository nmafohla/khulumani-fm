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
    <div className="relative overflow-hidden rounded-3xl bg-schedule-collage shadow-2xl border-2 border-khulumani-ink/80">
      {/* Dark contrast tint + Original Cassette Tape, Lightning & Headphones Grunge Overlay */}
      <div className="absolute inset-0 bg-[#0b151e]/60" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-schedule-grunge-overlay pointer-events-none opacity-95"
        aria-hidden="true"
      />

      <div className="relative z-10 px-5 sm:px-10 py-14 sm:py-16">
        {/* Skewed White Parallelogram "WEEKLY SCHEDULE" Header Badge */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="bg-white text-khulumani-ink font-black text-2xl sm:text-4xl uppercase tracking-wider px-10 py-3 clip-skew-badge shadow-xl">
            WEEKLY SCHEDULE
          </div>
        </div>

        {/* Full-Width Rounded Emerald Green Day Selector Bar with Orange Active Pill */}
        <div
          className="max-w-5xl mx-auto rounded-3xl sm:rounded-full bg-[#0d5c31] p-2 shadow-xl border border-white/15 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5"
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
                className={`px-4 py-3 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                  isSelected
                    ? "bg-[#c24b00] text-white shadow-md scale-[1.02]"
                    : "text-white hover:bg-white/15"
                }`}
              >
                <span>{d.label}</span>
                {isToday && (
                  <span
                    className="inline-block w-2 h-2 rounded-full bg-amber-300"
                    title="Today in Bulawayo (CAT)"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* 3-Column Photo-Backed Show Cards Matching Screenshot 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {dayShows.map((show) => {
            const isCurrent =
              selectedDay === currentCatDay && currentShow.id === show.id;
            return (
              <div
                key={show.id}
                className={`relative rounded-2xl overflow-hidden min-h-[250px] flex flex-col justify-between p-6 border transition-transform hover:-translate-y-1 shadow-xl ${
                  isCurrent
                    ? "border-2 border-amber-300 ring-2 ring-[#c24b00]/60"
                    : "border-white/20"
                }`}
              >
                {/* Studio Microphone & Edison Bulb Card Background */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/show-banner.jpg"
                  alt={show.title}
                  width={420}
                  height={260}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/45" />

                {/* Top Badge Row: Skewed Black "NOW PLAYING" Badge on Active Card */}
                <div className="relative z-10 flex items-center justify-between gap-2">
                  {isCurrent ? (
                    <span className="bg-black text-white font-black text-xs sm:text-sm uppercase tracking-wider px-5 py-1.5 clip-skew-badge shadow-md border-l-4 border-[#c24b00]">
                      NOW PLAYING
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded bg-black/55 text-white/90 text-[11px] font-bold uppercase tracking-wider">
                      95.0 FM LINEUP
                    </span>
                  )}

                  <span className="px-2.5 py-0.5 border border-[#14b8a6] text-[#2dd4bf] bg-black/50 text-[11px] font-black uppercase tracking-widest">
                    {show.genre || "MIXED-BAG"}
                  </span>
                </div>

                {/* Center / Bottom Show Title & Time Slot */}
                <div className="relative z-10 mt-8 text-white">
                  <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white leading-tight drop-shadow">
                    {show.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 mt-2 text-xs font-extrabold text-amber-300">
                    <span className="inline-flex items-center gap-1">
                      <Mic2 className="w-3.5 h-3.5 text-[#2dd4bf]" />
                      With {show.presenter}
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono text-white">
                      <Clock className="w-3.5 h-3.5 text-amber-300" />
                      {show.timeLabel}
                    </span>
                  </div>

                  <p className="text-xs text-white/80 mt-2.5 leading-relaxed line-clamp-2">
                    {show.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {showViewAllLink && (
          <div className="mt-10 pt-5 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-white">
            <p className="text-xs font-semibold text-white/85">
              All broadcast times are in Central Africa Time (CAT / Bulawayo
              95.0 FM).
            </p>
            <Link
              href="/shows-schedule"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#c24b00] hover:bg-khulumani-green text-white text-xs font-black uppercase tracking-wider transition-colors shadow-lg"
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
