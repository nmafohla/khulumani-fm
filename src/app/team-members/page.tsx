"use client";

import { useState } from "react";
import Link from "next/link";
import { Mic2, Clock, Radio, Search } from "lucide-react";
import { TEAM_MEMBERS } from "@/lib/stationContent";

export default function TeamMembersPage() {
  const [query, setQuery] = useState<string>("");

  const filtered = TEAM_MEMBERS.filter((m) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      m.name.toLowerCase().includes(q) ||
      m.shows.some((s) => s.toLowerCase().includes(q)) ||
      m.bio.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Page Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-khulumani-greenDark via-khulumani-green to-khulumani-teal text-white p-8 sm:p-10 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/20 text-amber-300 text-xs font-extrabold uppercase tracking-wider mb-3">
            <Mic2 className="w-3.5 h-3.5" />
            Izwi Lethu, Igugu Lethu • 95.0 FM
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Team Members &amp; Personalities
          </h1>
          <p className="text-sm sm:text-base text-white/90 mt-2 leading-relaxed">
            Meet the voices behind Bulawayo&apos;s favourite shows — from early
            morning wake-up calls on Jam &amp; Toast to late-night conversations
            on Pyjama Party.
          </p>
        </div>

        <Link
          href="/shows-schedule"
          className="px-5 py-3 rounded-2xl bg-white text-khulumani-greenDark font-extrabold text-sm shadow-md hover:bg-amber-300 transition-colors shrink-0"
        >
          View Show Schedule
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-khulumani-border shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-khulumani-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by presenter name or show (e.g., Khanyile, Jam & Toast)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-khulumani-bg border border-khulumani-border text-sm text-khulumani-ink focus:outline-none focus:border-khulumani-green"
          />
        </div>
        <div className="text-xs font-bold text-khulumani-muted px-2">
          Showing {filtered.length} of {TEAM_MEMBERS.length} On-Air
          Personalities
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((member) => (
          <div
            key={member.id}
            className="rounded-3xl bg-white border border-khulumani-border overflow-hidden shadow-sm hover:shadow-md hover:border-khulumani-green transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Avatar / Banner Header */}
              <div className="relative h-48 overflow-hidden bg-khulumani-greenDark">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-khulumani-green text-white mb-1">
                      {member.role}
                    </span>
                    <h2 className="text-2xl font-black text-white">
                      {member.name}
                    </h2>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center text-amber-300">
                    <Radio className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {member.shows.map((showTitle) => (
                    <span
                      key={showTitle}
                      className="px-2.5 py-1 rounded-lg bg-khulumani-greenLight text-khulumani-greenDark text-xs font-extrabold"
                    >
                      {showTitle}
                    </span>
                  ))}
                </div>

                <div className="flex items-start gap-1.5 text-xs font-bold text-khulumani-tangelo mb-3">
                  <Clock className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>{member.scheduleSummary}</span>
                </div>

                <p className="text-xs sm:text-sm text-khulumani-muted leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>

            <div className="px-6 py-3.5 bg-khulumani-bg/60 border-t border-khulumani-border flex items-center justify-between text-xs font-bold text-khulumani-greenDark">
              <span>Montrose Studios • Bulawayo</span>
              <span>95.0 FM</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
