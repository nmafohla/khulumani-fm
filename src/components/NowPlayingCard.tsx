"use client";

import Link from "next/link";
import { Calendar, Mic2, ArrowRight, Radio } from "lucide-react";
import { useRadio } from "@/context/RadioPlayerContext";
import { useSiteContent } from "@/context/SiteContentContext";
import { getBulawayoTime } from "@/lib/schedule";

export function NowPlayingCard() {
  const { currentShow, nextShow } = useRadio();
  const { activeContent } = useSiteContent();
  const { day: currentCatDay } = getBulawayoTime();

  const todaysLineup = activeContent.shows
    .filter((show) => show.days.includes(currentCatDay))
    .sort((a, b) => a.startHour - b.startHour);

  return (
    <div className="space-y-5">
      {/* Top 2-Card Apple Radio Glass Showcase (Live Now + Up Next) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Live On Air Card */}
        <div className="lg:col-span-7 rounded-[28px] bg-white border border-khulumani-border/80 p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black bg-[#119e45] text-white uppercase tracking-wider shadow-sm">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                LIVE ON 95.0 FM
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-khulumani-greenLight text-khulumani-greenDark border border-khulumani-green/15">
                {currentShow.genre}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-khulumani-muted ml-auto">
                <Calendar className="w-3.5 h-3.5 text-[#119e45]" />
                {currentShow.timeLabel} CAT
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-[#141414] tracking-tight">
              {currentShow.title}
            </h3>

            <div className="flex items-center gap-2 mt-1.5 text-sm text-[#0d6e30] font-extrabold">
              <Mic2 className="w-4 h-4 text-[#119e45]" />
              <span>
                {currentShow.daysLabel} • Hosted by {currentShow.presenter}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-khulumani-muted leading-relaxed mt-2.5">
              {currentShow.description}
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-khulumani-border flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-khulumani-muted">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-khulumani-green" />
              Montrose Studios • Bulawayo, Zimbabwe
            </span>
            <Link
              href="/team-members"
              className="min-h-[44px] px-3.5 rounded-xl text-[#119e45] hover:text-[#0d6e30] font-extrabold inline-flex items-center gap-1 apple-spring active:scale-[0.96] group"
            >
              <span>Meet Presenters</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Coming Up Next Card (Khulumani Logo Black & Kelly Green Glass Style) */}
        <div className="lg:col-span-5 rounded-[28px] bg-gradient-to-br from-[#141414] via-[#0d2616] to-[#119e45] text-white p-6 sm:p-7 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 text-xs font-black uppercase tracking-wider text-[#4ade80] mb-3">
              <span className="inline-flex items-center gap-1.5">
                <Radio className="w-4 h-4" />
                Up Next on 95.0 FM
              </span>
              <span className="px-2.5 py-1 rounded-full bg-black/40 text-white font-mono border border-white/10">
                {nextShow.timeLabel}
              </span>
            </div>

            <h4 className="text-2xl font-black text-white tracking-tight">
              {nextShow.title}
            </h4>

            <div className="flex items-center gap-1.5 mt-1.5 text-xs font-extrabold text-[#4ade80]">
              <Mic2 className="w-3.5 h-3.5 text-white" />
              <span>With {nextShow.presenter}</span>
            </div>

            <p className="text-xs text-white/95 mt-2.5 leading-relaxed">
              {nextShow.description}
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-white/20 flex items-center justify-between text-xs">
            <span className="text-white/90 font-semibold">
              7-Day Interactive Guide
            </span>
            <Link
              href="/shows-schedule"
              className="min-h-[44px] px-4 rounded-xl bg-white text-[#141414] font-black inline-flex items-center hover:bg-[#4ade80] apple-spring active:scale-[0.96] transition-colors"
            >
              Full Schedule
            </Link>
          </div>
        </div>
      </div>

      {/* Apple Music Radio Horizontal Today's Broadcast Strip with Soft-Edge CSS Mask */}
      <div className="rounded-[26px] bg-white border border-khulumani-border p-4 sm:px-6 shadow-sm">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-black uppercase tracking-wider text-[#141414]">
            Today&apos;s Bulawayo Broadcast Strip (CAT)
          </span>
          <span className="text-[11px] font-bold text-khulumani-muted">
            Swipe lineup →
          </span>
        </div>

        <div className="flex items-stretch gap-3 overflow-x-auto pb-2 soft-edge-fade-x">
          {todaysLineup.map((show) => {
            const isLive = show.id === currentShow.id;
            return (
              <div
                key={show.id}
                className={`min-w-[230px] sm:min-w-[250px] p-3.5 rounded-2xl border flex flex-col justify-between shrink-0 apple-spring ${
                  isLive
                    ? "bg-[#141414] text-white border-[#119e45] border-2 shadow-md"
                    : "bg-khulumani-bg/80 text-[#141414] border-khulumani-border"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-[11px] font-mono font-extrabold ${
                      isLive ? "text-[#4ade80]" : "text-[#0d6e30]"
                    }`}
                  >
                    {show.timeLabel}
                  </span>
                  {isLive && (
                    <span className="px-2 py-0.5 rounded-full bg-[#119e45] text-white text-[10px] font-black uppercase">
                      LIVE
                    </span>
                  )}
                </div>
                <p className="text-sm font-black mt-1.5 truncate">
                  {show.title}
                </p>
                <p
                  className={`text-xs font-bold truncate ${
                    isLive ? "text-white/85" : "text-khulumani-muted"
                  }`}
                >
                  {show.presenter}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
