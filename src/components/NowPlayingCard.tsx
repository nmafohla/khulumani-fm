"use client";

import { Sparkles, Calendar, Mic2, ArrowRight } from "lucide-react";
import type { ShowScheduleItem } from "@/types/radio";

interface NowPlayingCardProps {
  currentShow: ShowScheduleItem;
  nextShow: ShowScheduleItem;
}

export function NowPlayingCard({ currentShow, nextShow }: NowPlayingCardProps) {
  const formatTimeSlot = (start: number, end: number) => {
    const s = String(start).padStart(2, "0") + ":00";
    const e = String(end === 24 ? 0 : end).padStart(2, "0") + ":00";
    return `${s} - ${e} CAT`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Current Show Showcase */}
      <div className="lg:col-span-2 rounded-2xl bg-station-card border border-station-border p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-station-gold text-station-dark">
              <Sparkles className="w-3.5 h-3.5" />
              ON THE AIRWAVES
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-station-border/60 text-station-muted">
              {currentShow.genre}
            </span>
            <span className="flex items-center gap-1 text-xs text-station-muted font-mono ml-auto">
              <Calendar className="w-3.5 h-3.5 text-station-teal" />
              {formatTimeSlot(currentShow.startHour, currentShow.endHour)}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {currentShow.title}
          </h3>

          <div className="flex items-center gap-2 mt-2 text-sm text-station-gold font-medium">
            <Mic2 className="w-4 h-4" />
            <span>Hosted by {currentShow.presenter}</span>
          </div>

          <p className="text-sm text-station-muted leading-relaxed mt-4 max-w-2xl">
            {currentShow.description}
          </p>
        </div>

        {/* Region Tag */}
        <div className="mt-6 pt-4 border-t border-station-border/50 flex items-center justify-between text-xs text-station-muted">
          <span>
            Broadcasting to Bulawayo, Matabeleland &amp; Online Worldwide
          </span>
          <span className="text-white font-mono">FM 95.0</span>
        </div>
      </div>

      {/* Up Next Teaser Card */}
      <div className="rounded-2xl bg-gradient-to-br from-station-card to-station-dark border border-station-border p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-station-teal mb-4">
            <ArrowRight className="w-4 h-4" />
            Coming Up Next
          </div>

          <span className="text-xs font-mono text-station-muted block mb-1">
            {formatTimeSlot(nextShow.startHour, nextShow.endHour)}
          </span>

          <h4 className="text-lg font-bold text-white line-clamp-2">
            {nextShow.title}
          </h4>

          <div className="flex items-center gap-1.5 mt-2 text-xs text-station-muted">
            <Mic2 className="w-3.5 h-3.5 text-station-gold" />
            <span>{nextShow.presenter}</span>
          </div>

          <p className="text-xs text-station-muted/80 mt-3 line-clamp-3 leading-relaxed">
            {nextShow.description}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-station-border/40 text-[11px] text-station-muted">
          Lineup automatically synchronized to Bulawayo (CAT)
        </div>
      </div>
    </div>
  );
}
