"use client";

import Link from "next/link";
import { Calendar, Mic2, ArrowRight, Sparkles } from "lucide-react";
import { useRadio } from "@/context/RadioPlayerContext";

export function NowPlayingCard() {
  const { currentShow, nextShow } = useRadio();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Current Show Showcase */}
      <div className="lg:col-span-2 rounded-3xl bg-white border border-khulumani-border p-6 sm:p-8 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-khulumani-green text-white">
              <Sparkles className="w-3.5 h-3.5" />
              ON THE AIRWAVES
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-khulumani-greenLight text-khulumani-greenDark">
              {currentShow.genre}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-khulumani-muted ml-auto">
              <Calendar className="w-3.5 h-3.5 text-khulumani-green" />
              {currentShow.timeLabel}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-khulumani-ink tracking-tight">
            {currentShow.title}
          </h3>

          <div className="flex items-center gap-2 mt-2 text-sm text-khulumani-greenDark font-bold">
            <Mic2 className="w-4 h-4 text-khulumani-green" />
            <span>
              {currentShow.daysLabel}, with {currentShow.presenter}
            </span>
          </div>

          <p className="text-sm text-khulumani-muted leading-relaxed mt-3">
            {currentShow.description}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-khulumani-border flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-khulumani-muted">
          <span>Broadcasting from Montrose Studios, Bulawayo</span>
          <Link
            href="/team-members"
            className="text-khulumani-green hover:text-khulumani-greenDark font-extrabold inline-flex items-center gap-1"
          >
            <span>Meet the Presenters</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Coming Later / Up Next Card */}
      <div className="rounded-3xl bg-gradient-to-br from-khulumani-greenDark to-khulumani-green text-white p-6 sm:p-8 shadow-md flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-300 mb-3">
            <span className="inline-flex items-center gap-1.5">
              <ArrowRight className="w-4 h-4" />
              Coming Later
            </span>
            <span className="px-2 py-0.5 rounded bg-black/20 text-white font-mono">
              {nextShow.timeLabel}
            </span>
          </div>

          <h4 className="text-xl font-black text-white">{nextShow.title}</h4>

          <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-amber-200">
            <Mic2 className="w-3.5 h-3.5" />
            <span>Hosted by {nextShow.presenter}</span>
          </div>

          <p className="text-xs text-white/85 mt-3 leading-relaxed">
            {nextShow.description}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-white/20 flex items-center justify-between text-xs">
          <span className="text-white/80">Full 7-Day Lineup</span>
          <Link
            href="/shows-schedule"
            className="px-3 py-1.5 rounded-xl bg-white text-khulumani-greenDark font-extrabold hover:bg-amber-300 transition-colors"
          >
            View Schedule
          </Link>
        </div>
      </div>
    </div>
  );
}
