"use client";

import Link from "next/link";
import { Newspaper, Calendar, User, ArrowRight } from "lucide-react";
import { useSiteContent } from "@/context/SiteContentContext";

export default function NewsPage() {
  const { activeContent } = useSiteContent();
  const articles = activeContent.news;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Page Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-khulumani-greenDark text-white p-8 sm:p-10 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/post-3.jpg"
          alt="Khulumani FM Newsroom and Live Studio"
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-khulumani-greenDark/95 via-khulumani-green/90 to-khulumani-teal/85" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/20 text-amber-300 text-xs font-extrabold uppercase tracking-wider mb-3">
            <Newspaper className="w-3.5 h-3.5" />
            Montrose Newsroom • 95.0 FM
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Station News &amp; Community Updates
          </h1>
          <p className="text-sm sm:text-base text-white/90 mt-2 leading-relaxed">
            Stay up to date with Bulawayo arts, music submissions, community
            roadshows, and regional stories from Khulumani FM 95.0.
          </p>
        </div>

        <Link
          href="/contacts"
          className="relative z-10 px-5 py-3 rounded-2xl bg-white text-khulumani-greenDark font-extrabold text-sm shadow-md hover:bg-amber-300 transition-colors shrink-0"
        >
          Submit a Community Story
        </Link>
      </div>

      {/* News Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article) => (
          <article
            key={article.id}
            className="rounded-3xl bg-white border border-khulumani-border overflow-hidden shadow-sm hover:shadow-md hover:border-khulumani-green transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-56 overflow-hidden bg-khulumani-greenDark">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-khulumani-green text-white text-xs font-extrabold shadow-sm">
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-7">
                <div className="flex items-center gap-4 text-xs font-semibold text-khulumani-muted mb-3">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-khulumani-green" />
                    {article.date}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-khulumani-green" />
                    {article.author}
                  </span>
                </div>

                <h2 className="text-xl font-black text-khulumani-ink leading-snug">
                  {article.title}
                </h2>

                <p className="text-sm text-khulumani-muted mt-3 leading-relaxed">
                  {article.excerpt}
                </p>

                <p className="text-xs sm:text-sm text-khulumani-ink/90 mt-3 pt-3 border-t border-khulumani-border/60 leading-relaxed">
                  {article.content}
                </p>
              </div>
            </div>

            <div className="px-6 py-4 bg-khulumani-bg/60 border-t border-khulumani-border flex items-center justify-between text-xs font-bold text-khulumani-greenDark">
              <span>Khulumani FM 95.0 Bulletin</span>
              <Link
                href="/shows-schedule"
                className="inline-flex items-center gap-1 text-khulumani-green hover:underline"
              >
                <span>Tune In Live</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
