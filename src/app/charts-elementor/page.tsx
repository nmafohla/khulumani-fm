"use client";

import { useState } from "react";
import {
  Trophy,
  TrendingUp,
  TrendingDown,
  Minus,
  ThumbsUp,
  Music,
  MessageSquare,
} from "lucide-react";
import { TOP_CHART_TRACKS, STATION_CONTACTS } from "@/lib/stationContent";

export default function ChartsPage() {
  const [votedIds, setVotedIds] = useState<Record<number, boolean>>({});
  const [voteCounts, setVoteCounts] = useState<Record<number, number>>(() => {
    const initial: Record<number, number> = {};
    for (const track of TOP_CHART_TRACKS) {
      initial[track.position] = track.votes;
    }
    return initial;
  });

  const handleVote = (position: number) => {
    if (votedIds[position]) return;
    setVotedIds((prev) => ({ ...prev, [position]: true }));
    setVoteCounts((prev) => ({
      ...prev,
      [position]: (prev[position] ?? 0) + 1,
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Page Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-khulumani-greenDark via-khulumani-green to-khulumani-teal text-white p-8 sm:p-10 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/20 text-amber-300 text-xs font-extrabold uppercase tracking-wider mb-3">
            <Trophy className="w-3.5 h-3.5" />
            Official Station Countdown • 95.0 FM
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Khulumani Top Week Charts
          </h1>
          <p className="text-sm sm:text-base text-white/90 mt-2 leading-relaxed">
            The biggest hits voted by listeners across Bulawayo, Matabeleland,
            and the diaspora. Vote for your favourite track below or send your
            chart picks via WhatsApp.
          </p>
        </div>

        <a
          href={STATION_CONTACTS.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-khulumani-greenDark font-extrabold text-sm shadow-md hover:bg-amber-300 transition-colors shrink-0"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Vote on WhatsApp</span>
        </a>
      </div>

      {/* Main Top 10 Chart List */}
      <div className="rounded-3xl bg-white border border-khulumani-border p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-khulumani-border">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-khulumani-green">
              Top Week Chart 11
            </span>
            <h2 className="text-2xl font-black text-khulumani-ink mt-0.5">
              This Week&apos;s Official Top 10
            </h2>
          </div>
          <span className="text-xs font-bold text-khulumani-muted">
            Click &ldquo;Vote&rdquo; to support your favourite artist
          </span>
        </div>

        <div className="divide-y divide-khulumani-border mt-4">
          {TOP_CHART_TRACKS.map((track) => {
            const hasVoted = Boolean(votedIds[track.position]);
            const currentVotes = voteCounts[track.position] ?? track.votes;
            const diff = track.previousPosition - track.position;

            return (
              <div
                key={track.position}
                className="py-4 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-khulumani-bg/50 px-3 rounded-2xl transition-colors"
              >
                <div className="flex items-center gap-4 min-w-0">
                  {/* Position Badge */}
                  <div
                    className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center shrink-0 font-black ${
                      track.position === 1
                        ? "bg-khulumani-tangelo text-white shadow-md shadow-khulumani-tangelo/25"
                        : track.position <= 3
                          ? "bg-khulumani-green text-white"
                          : "bg-khulumani-greenLight text-khulumani-greenDark"
                    }`}
                  >
                    <span className="text-lg leading-none">
                      #{track.position}
                    </span>
                  </div>

                  {/* Cover Image */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={track.coverImage}
                    alt={track.title}
                    className="w-14 h-14 rounded-2xl object-cover border border-khulumani-border shrink-0"
                  />

                  {/* Track Meta */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      {diff > 0 ? (
                        <span className="inline-flex items-center gap-0.5 text-[11px] font-extrabold text-khulumani-green">
                          <TrendingUp className="w-3 h-3" />+{diff}
                        </span>
                      ) : diff < 0 ? (
                        <span className="inline-flex items-center gap-0.5 text-[11px] font-extrabold text-red-500">
                          <TrendingDown className="w-3 h-3" />
                          {diff}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-khulumani-muted">
                          <Minus className="w-3 h-3" /> Steady
                        </span>
                      )}
                      <span className="text-[11px] text-khulumani-muted font-semibold">
                        • {track.weeksOnChart} wks on chart
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-khulumani-ink truncate">
                      {track.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-bold text-khulumani-muted truncate">
                      {track.artist}
                    </p>
                  </div>
                </div>

                {/* Right: Votes & Action */}
                <div className="flex items-center gap-4 self-end sm:self-center shrink-0">
                  <div className="text-right">
                    <div className="text-sm font-mono font-extrabold text-khulumani-ink">
                      {currentVotes.toLocaleString()}
                    </div>
                    <div className="text-[10px] uppercase font-bold text-khulumani-muted">
                      Listener Votes
                    </div>
                  </div>

                  <button
                    onClick={() => handleVote(track.position)}
                    disabled={hasVoted}
                    className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                      hasVoted
                        ? "bg-khulumani-greenLight text-khulumani-greenDark cursor-default"
                        : "bg-khulumani-green hover:bg-khulumani-greenDark text-white shadow-sm active:scale-95"
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{hasVoted ? "Voted!" : "Vote"}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Previous Chart Archives */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Top Week Chart 11",
            tracks: "72 Chart Entries",
            img: "/images/chart-1.jpg",
          },
          {
            title: "Top Week Chart 10",
            tracks: "48 Chart Entries",
            img: "/images/chart-2.jpg",
          },
          {
            title: "Top Week Chart 09",
            tracks: "27 Chart Entries",
            img: "/images/chart-3.jpg",
          },
        ].map((archive) => (
          <div
            key={archive.title}
            className="rounded-3xl bg-white border border-khulumani-border overflow-hidden shadow-sm group"
          >
            <div className="relative h-44 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={archive.img}
                alt={archive.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-300">
                  <Music className="w-3 h-3" /> {archive.tracks}
                </span>
                <h3 className="text-lg font-black">{archive.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
