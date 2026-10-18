"use client";

import type { ChartTrack } from "@/types/radio";

export function ChartsSectionEditor({
  charts,
  onChange,
}: {
  readonly charts: readonly ChartTrack[];
  readonly onChange: (next: readonly ChartTrack[]) => void;
}) {
  const updateTrack = (index: number, patch: Partial<ChartTrack>) => {
    const updated = charts.map((item, idx) =>
      idx === index ? { ...item, ...patch } : item
    );
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-black text-khulumani-ink">
        Top 10 Weekly Chart Countdown Editor
      </h2>
      <div className="space-y-3">
        {charts.map((track, idx) => (
          <div
            key={track.position}
            className="p-4 rounded-2xl bg-khulumani-bg/70 border border-khulumani-border grid grid-cols-1 md:grid-cols-12 gap-3 items-center"
          >
            <div className="md:col-span-1 font-black text-khulumani-greenDark text-sm">
              #{track.position}
            </div>
            <div className="md:col-span-4">
              <label
                htmlFor={`chart-title-${track.position}`}
                className="block text-[10px] font-bold uppercase text-khulumani-muted mb-0.5"
              >
                Track Title
              </label>
              <input
                id={`chart-title-${track.position}`}
                name={`chartTitle_${track.position}`}
                type="text"
                value={track.title}
                onChange={(e) => updateTrack(idx, { title: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white border border-khulumani-border text-xs font-bold text-khulumani-ink"
              />
            </div>
            <div className="md:col-span-4">
              <label
                htmlFor={`chart-artist-${track.position}`}
                className="block text-[10px] font-bold uppercase text-khulumani-muted mb-0.5"
              >
                Artist
              </label>
              <input
                id={`chart-artist-${track.position}`}
                name={`chartArtist_${track.position}`}
                type="text"
                value={track.artist}
                onChange={(e) => updateTrack(idx, { artist: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white border border-khulumani-border text-xs text-khulumani-ink"
              />
            </div>
            <div className="md:col-span-3">
              <label
                htmlFor={`chart-votes-${track.position}`}
                className="block text-[10px] font-bold uppercase text-khulumani-muted mb-0.5"
              >
                Listener Votes
              </label>
              <input
                id={`chart-votes-${track.position}`}
                name={`chartVotes_${track.position}`}
                type="number"
                min={0}
                value={track.votes}
                onChange={(e) =>
                  updateTrack(idx, {
                    votes: Math.max(
                      0,
                      Number.parseInt(e.target.value, 10) || 0
                    ),
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-white border border-khulumani-border text-xs font-mono font-bold text-khulumani-ink"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
