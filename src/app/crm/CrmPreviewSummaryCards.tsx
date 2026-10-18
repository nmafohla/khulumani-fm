import { Trophy, Phone, Newspaper } from "lucide-react";
import type { SiteContentPayload } from "@/types/radio";

interface CrmPreviewSummaryCardsProps {
  readonly displayed: SiteContentPayload;
}

export function CrmPreviewSummaryCards({
  displayed,
}: CrmPreviewSummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="rounded-2xl bg-white border border-khulumani-border p-4 space-y-2.5">
        <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#119e45] uppercase">
          <Trophy className="w-3.5 h-3.5" />
          Top 3 Chart Preview
        </div>
        {displayed.charts.slice(0, 3).map((track) => (
          <div
            key={track.position}
            className="p-2.5 rounded-xl bg-khulumani-bg flex items-center justify-between text-xs"
          >
            <div className="truncate pr-2">
              <span className="font-black text-[#141414] mr-1.5">
                #{track.position}
              </span>
              <span className="font-bold text-khulumani-ink">
                {track.title}
              </span>
            </div>
            <span className="font-mono font-bold text-[#119e45] shrink-0">
              {track.votes}
            </span>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-white border border-khulumani-border p-4 space-y-2.5">
        <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#119e45] uppercase">
          <Phone className="w-3.5 h-3.5" />
          Contacts Tab Preview
        </div>
        <div className="p-2.5 rounded-xl bg-khulumani-bg space-y-1 text-xs">
          <div className="font-black text-[#141414]">
            {displayed.contacts.heroTitle}
          </div>
          <div className="text-[11px] text-khulumani-muted line-clamp-2">
            {displayed.contacts.heroSubtitle}
          </div>
          <div className="pt-1 font-mono font-bold text-[#119e45]">
            Tel: {displayed.contacts.phone} • WA: {displayed.contacts.mobile}
          </div>
          <div className="text-[11px] font-bold text-khulumani-ink">
            {displayed.contacts.email}
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-khulumani-border p-4 space-y-2.5">
        <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#119e45] uppercase">
          <Newspaper className="w-3.5 h-3.5" />
          Latest News Preview
        </div>
        {displayed.news.slice(0, 2).map((item) => (
          <div
            key={item.id}
            className="p-2.5 rounded-xl bg-khulumani-bg space-y-1 text-xs"
          >
            <span className="text-[10px] font-extrabold text-[#119e45] uppercase">
              {item.category}
            </span>
            <div className="font-black text-[#141414] line-clamp-1">
              {item.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
