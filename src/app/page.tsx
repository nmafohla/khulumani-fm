"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { PlayerConsole } from "@/components/PlayerConsole";
import { NowPlayingCard } from "@/components/NowPlayingCard";
import { ScheduleSection } from "@/components/ScheduleSection";
import { StudioConnect } from "@/components/StudioConnect";
import { useRadioPlayer } from "@/hooks/useRadioPlayer";
import { getCurrentShow, getNextShow } from "@/lib/schedule";
import type { ShowScheduleItem } from "@/types/radio";

export default function HomePage() {
  const [currentShow, setCurrentShow] =
    useState<ShowScheduleItem>(getCurrentShow());
  const [nextShow, setNextShow] = useState<ShowScheduleItem>(getNextShow());

  // Periodically refresh the show guide as hours advance
  useEffect(() => {
    const updateLineup = () => {
      setCurrentShow(getCurrentShow());
      setNextShow(getNextShow());
    };

    updateLineup();
    const interval = setInterval(updateLineup, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const player = useRadioPlayer(
    process.env.NEXT_PUBLIC_STREAM_URL,
    currentShow.title
  );

  return (
    <div className="flex flex-col min-h-screen bg-station-dark text-slate-100">
      <Header isPlaying={player.status === "playing"} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 sm:space-y-12">
        {/* Signature Interactive Console */}
        <section aria-label="Audio Broadcast Player">
          <PlayerConsole
            status={player.status}
            volume={player.volume}
            isMuted={player.isMuted}
            diagnostics={player.diagnostics}
            errorMessage={player.errorMessage}
            currentShowTitle={currentShow.title}
            onTogglePlay={player.togglePlay}
            onSetVolume={player.setVolume}
            onToggleMute={player.toggleMute}
            onForceReconnect={player.forceReconnect}
          />
        </section>

        {/* Current & Upcoming Show Info */}
        <section aria-label="Current Show Details">
          <NowPlayingCard currentShow={currentShow} nextShow={nextShow} />
        </section>

        {/* Full Weekly Schedule */}
        <section aria-label="Weekly Show Schedule">
          <ScheduleSection />
        </section>

        {/* Studio Contacts & Transmission Details */}
        <section aria-label="Studio Connect & Hotline">
          <StudioConnect />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-station-border bg-station-card/40 py-8 mt-12 text-center text-xs text-station-muted">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-semibold text-slate-300">
            Khulumani FM 95.0 MHz — The Voice of the City of Kings and Queens
          </p>
          <p>
            Montrose Studios, Bulawayo, Zimbabwe • A division of the Zimbabwe
            Broadcasting Corporation (ZBC)
          </p>
          <p className="text-[11px] text-station-muted/70 pt-2">
            Engineered with auto-reconnecting stream watchdog for 24/7
            uninterrupted listening.
          </p>
        </div>
      </footer>
    </div>
  );
}
