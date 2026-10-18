"use client";

import Link from "next/link";
import { Calendar, Clock, Mic2, Radio } from "lucide-react";
import { ScheduleSection } from "@/components/ScheduleSection";
import { useSiteContent } from "@/context/SiteContentContext";

export default function ShowsSchedulePage() {
  const { activeContent } = useSiteContent();
  const shows = activeContent.shows;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Page Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-khulumani-greenDark text-white p-8 sm:p-10 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/post-2.jpg"
          alt="Khulumani FM Broadcast Mixing Console"
          className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-khulumani-greenDark/95 via-khulumani-green/90 to-khulumani-teal/85" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/20 text-amber-300 text-xs font-extrabold uppercase tracking-wider mb-3">
            <Calendar className="w-3.5 h-3.5" />
            24/7 Broadcast Lineup • 95.0 FM
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Shows &amp; Weekly Schedule
          </h1>
          <p className="text-sm sm:text-base text-white/90 mt-2 leading-relaxed">
            Explore Khulumani FM&apos;s full 7-day programme lineup from
            Montrose Studios in Bulawayo. Select any day of the week below to
            see who is on the mic.
          </p>
        </div>

        <Link
          href="/team-members"
          className="relative z-10 px-5 py-3 rounded-2xl bg-white text-khulumani-greenDark font-extrabold text-sm shadow-md hover:bg-amber-300 transition-colors shrink-0"
        >
          Meet Our Personalities
        </Link>
      </div>

      {/* Interactive 7-Day Schedule Component */}
      <ScheduleSection showViewAllLink={false} />

      {/* Complete Programme Directory */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-khulumani-green">
              Complete Directory
            </span>
            <h2 className="text-2xl font-black text-khulumani-ink mt-0.5">
              All Shows &amp; Presenter Rotations
            </h2>
          </div>
          <span className="text-xs font-bold text-khulumani-muted">
            {shows.length} Scheduled Editions
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {shows.map((show) => (
            <div
              key={show.id}
              className="rounded-2xl bg-white border border-khulumani-border p-5 shadow-sm hover:border-khulumani-green transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-lg bg-khulumani-greenLight text-khulumani-greenDark text-xs font-extrabold">
                    {show.daysLabel}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-khulumani-tangelo">
                    <Clock className="w-3.5 h-3.5" />
                    {show.timeLabel}
                  </span>
                </div>

                <h3 className="text-lg font-black text-khulumani-ink">
                  {show.title}
                </h3>

                <div className="flex items-center gap-1.5 mt-1.5 text-xs font-bold text-khulumani-greenDark">
                  <Mic2 className="w-3.5 h-3.5 text-khulumani-green" />
                  <span>Presenter: {show.presenter}</span>
                </div>

                <p className="text-xs text-khulumani-muted mt-3 leading-relaxed">
                  {show.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-khulumani-border flex items-center justify-between text-[11px] font-bold text-khulumani-muted">
                <span className="inline-flex items-center gap-1">
                  <Radio className="w-3 h-3 text-khulumani-green" />
                  {show.genre}
                </span>
                <span className="text-khulumani-greenDark">FM 95.0</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
