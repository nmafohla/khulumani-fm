"use client";

import Link from "next/link";
import { Trophy, Mic2, Newspaper, ArrowRight, Megaphone } from "lucide-react";
import { PlayerConsole } from "@/components/PlayerConsole";
import { NowPlayingCard } from "@/components/NowPlayingCard";
import { ScheduleSection } from "@/components/ScheduleSection";
import { StudioConnect } from "@/components/StudioConnect";
import { useSiteContent } from "@/context/SiteContentContext";

export default function HomePage() {
  const { activeContent } = useSiteContent();
  const topFourTracks = activeContent.charts.slice(0, 4);
  const featuredTeam = activeContent.team.slice(0, 4);
  const latestNews = activeContent.news.slice(0, 2);
  const hero = activeContent.hero;

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10 sm:space-y-12">
      {/* Station Hero Banner & Broadcast Announcement */}
      <section className="rounded-3xl bg-gradient-to-r from-khulumani-greenDark via-khulumani-green to-khulumani-teal text-white p-6 sm:p-8 shadow-lg flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-3xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/25 text-amber-300 text-xs font-extrabold uppercase tracking-wider">
            <Megaphone className="w-3.5 h-3.5" />
            {hero.badge}
          </span>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            {hero.headline}
          </h1>
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
            {hero.subtitle}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-black/20 border border-white/20 max-w-sm shrink-0">
          <span className="text-[11px] font-black uppercase tracking-wider text-amber-300 block mb-1">
            Studio Notice
          </span>
          <p className="text-xs font-semibold text-white/95 leading-relaxed">
            {hero.announcement}
          </p>
        </div>
      </section>

      {/* Signature Interactive Console */}
      <section aria-label="Audio Broadcast Player">
        <PlayerConsole />
      </section>

      {/* Current & Upcoming Show Info */}
      <section aria-label="Current Show Details">
        <NowPlayingCard />
      </section>

      {/* Full Weekly Schedule */}
      <section aria-label="Weekly Show Schedule">
        <ScheduleSection showViewAllLink={true} />
      </section>

      {/* Charts & Personalities Split Section */}
      <section
        aria-label="Charts and Personalities"
        className="grid grid-cols-1 lg:grid-cols-12 gap-6"
      >
        {/* Top Week Chart Preview */}
        <div className="lg:col-span-6 rounded-3xl bg-white border border-khulumani-border p-6 sm:p-8 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 pb-4 border-b border-khulumani-border">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-khulumani-green">
                  <Trophy className="w-3.5 h-3.5" />
                  Top Week Chart
                </span>
                <h2 className="text-2xl font-black text-khulumani-ink mt-0.5">
                  Bulawayo&apos;s Hottest Tracks
                </h2>
              </div>
              <Link
                href="/charts-elementor"
                className="text-xs font-extrabold text-khulumani-green hover:text-khulumani-greenDark inline-flex items-center gap-1"
              >
                <span>Full Chart</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-khulumani-border mt-2">
              {topFourTracks.map((track) => (
                <div
                  key={track.position}
                  className="py-3.5 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span
                      className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                        track.position === 1
                          ? "bg-khulumani-tangelo text-white"
                          : "bg-khulumani-greenLight text-khulumani-greenDark"
                      }`}
                    >
                      #{track.position}
                    </span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={track.coverImage}
                      alt={track.title}
                      className="w-11 h-11 rounded-xl object-cover border border-khulumani-border shrink-0"
                    />
                    <div className="min-w-0">
                      <h3 className="text-sm font-black text-khulumani-ink truncate">
                        {track.title}
                      </h3>
                      <p className="text-xs font-semibold text-khulumani-muted truncate">
                        {track.artist}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-khulumani-greenDark shrink-0">
                    {track.votes.toLocaleString()} votes
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-khulumani-border">
            <Link
              href="/charts-elementor"
              className="block w-full py-2.5 rounded-xl bg-khulumani-greenLight hover:bg-khulumani-green text-khulumani-greenDark hover:text-white text-center text-xs font-extrabold transition-colors"
            >
              Vote on Top Week Chart 11
            </Link>
          </div>
        </div>

        {/* Featured Personalities Preview */}
        <div className="lg:col-span-6 rounded-3xl bg-white border border-khulumani-border p-6 sm:p-8 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 pb-4 border-b border-khulumani-border">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-khulumani-green">
                  <Mic2 className="w-3.5 h-3.5" />
                  On-Air Voices
                </span>
                <h2 className="text-2xl font-black text-khulumani-ink mt-0.5">
                  Station Personalities
                </h2>
              </div>
              <Link
                href="/team-members"
                className="text-xs font-extrabold text-khulumani-green hover:text-khulumani-greenDark inline-flex items-center gap-1"
              >
                <span>All {activeContent.team.length} Presenters</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-4">
              {featuredTeam.map((member) => (
                <Link
                  key={member.id}
                  href="/team-members"
                  className="p-3.5 rounded-2xl bg-khulumani-bg/70 border border-khulumani-border hover:border-khulumani-green transition-all flex items-center gap-3.5"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-khulumani-border shrink-0"
                  />
                  <div className="min-w-0">
                    <h3 className="text-sm font-black text-khulumani-ink truncate">
                      {member.name}
                    </h3>
                    <p className="text-xs font-extrabold text-khulumani-green truncate">
                      {member.shows.join(" • ")}
                    </p>
                    <p className="text-[11px] text-khulumani-muted truncate mt-0.5">
                      {member.role}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-khulumani-border">
            <Link
              href="/team-members"
              className="block w-full py-2.5 rounded-xl bg-khulumani-greenLight hover:bg-khulumani-green text-khulumani-greenDark hover:text-white text-center text-xs font-extrabold transition-colors"
            >
              Meet All {activeContent.team.length} Producers &amp; Presenters
            </Link>
          </div>
        </div>
      </section>

      {/* Station News Highlights */}
      <section className="rounded-3xl bg-white border border-khulumani-border p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between gap-2 pb-5 border-b border-khulumani-border">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-khulumani-green">
              <Newspaper className="w-3.5 h-3.5" />
              Latest Bulletins
            </span>
            <h2 className="text-2xl font-black text-khulumani-ink mt-0.5">
              Bulawayo &amp; Station News
            </h2>
          </div>
          <Link
            href="/news"
            className="text-xs font-extrabold text-khulumani-green hover:text-khulumani-greenDark inline-flex items-center gap-1"
          >
            <span>All News</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          {latestNews.map((item) => (
            <Link
              key={item.id}
              href="/news"
              className="p-5 rounded-2xl bg-khulumani-bg/60 border border-khulumani-border hover:border-khulumani-green transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-khulumani-greenLight text-khulumani-greenDark text-[11px] font-extrabold">
                    {item.category}
                  </span>
                  <span className="text-xs font-semibold text-khulumani-muted">
                    {item.date}
                  </span>
                </div>
                <h3 className="text-base font-black text-khulumani-ink">
                  {item.title}
                </h3>
                <p className="text-xs text-khulumani-muted mt-2 leading-relaxed line-clamp-2">
                  {item.excerpt}
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-extrabold text-khulumani-green mt-4">
                Read full bulletin <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Studio Contacts & Transmission Details */}
      <section aria-label="Studio Connect & Hotline">
        <StudioConnect />
      </section>
    </div>
  );
}
