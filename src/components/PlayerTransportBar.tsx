"use client";

import { Play, Pause, RotateCw, Volume2, VolumeX } from "lucide-react";
import { useRadio } from "@/context/RadioPlayerContext";

const SPECTRUM_BARS = [
  65, 40, 85, 35, 95, 70, 50, 80, 100, 45, 90, 60, 75, 55, 90, 40, 80, 65, 95,
  50, 70, 85, 45, 60,
] as const;

export function PlayerTransportBar() {
  const {
    status,
    volume,
    isMuted,
    currentShow,
    togglePlay,
    setVolume,
    toggleMute,
    forceReconnect,
  } = useRadio();

  const isPlaying = status === "playing";
  const isLoading = status === "loading";
  const isReconnecting = status === "reconnecting";

  return (
    <div className="relative z-10 mt-6 p-4 sm:px-6 rounded-3xl bg-[#111613]/85 backdrop-blur-2xl border border-white/20 flex flex-col lg:flex-row items-center justify-between gap-5">
      <div className="flex items-center gap-4 w-full lg:w-auto">
        <button
          type="button"
          onClick={togglePlay}
          disabled={isLoading || isReconnecting}
          aria-label={
            isPlaying ? "Pause Khulumani FM" : "Play Khulumani FM 95.0"
          }
          className={`min-w-[52px] min-h-[52px] px-5 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider inline-flex items-center justify-center gap-2.5 shadow-lg apple-spring active:scale-[0.96] shrink-0 ${
            isPlaying
              ? "bg-white text-[#141414] hover:bg-neutral-200"
              : "bg-[#119e45] hover:bg-[#0d7e36] text-white"
          }`}
        >
          {isPlaying ? (
            <>
              <Pause className="w-5 h-5 fill-current" />
              <span>Pause 95.0</span>
            </>
          ) : (
            <>
              <Play className="w-5 h-5 fill-current" />
              <span>Listen Live</span>
            </>
          )}
        </button>

        <div className="min-w-0">
          <span className="text-[11px] font-black uppercase tracking-widest text-[#22c55e] block">
            {isPlaying
              ? "STREAMING MONTROSE STUDIOS"
              : "IZWI LETHU, IGUGU LETHU • 95.0 FM"}
          </span>
          <p className="text-sm font-black text-white truncate">
            {currentShow.title} — {currentShow.presenter}
          </p>
        </div>
      </div>

      {/* 24-Bar Animated Equalizer in Strictly Khulumani Green & Crisp White */}
      <div className="flex items-end justify-center gap-1 h-11 w-full sm:w-52 px-3 py-2 rounded-2xl bg-black/50 border border-white/15">
        {SPECTRUM_BARS.map((maxHeight, index) => {
          const heightPct = isPlaying ? maxHeight : 22;
          const duration = 0.45 + (index % 5) * 0.14;
          return (
            <div
              key={index}
              className="w-1.5 rounded-full transition-all bg-gradient-to-t from-[#119e45] via-[#22c55e] to-white"
              style={{
                height: `${heightPct}%`,
                opacity: isPlaying ? 0.95 : 0.4,
                animation: isPlaying
                  ? `pulseWave ${duration}s ease-in-out infinite alternate`
                  : "none",
              }}
            />
          );
        })}
      </div>

      {/* Volume + Reconnect (44px HIG targets) */}
      <div className="flex items-center justify-between sm:justify-end gap-3 w-full lg:w-auto">
        <div className="flex items-center gap-2 flex-1 sm:w-44">
          <button
            type="button"
            onClick={toggleMute}
            className="min-w-[44px] min-h-[44px] rounded-xl text-white hover:bg-white/15 flex items-center justify-center apple-spring active:scale-[0.96]"
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-5 h-5 text-red-400" />
            ) : (
              <Volume2 className="w-5 h-5 text-[#22c55e]" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-full accent-[#119e45] cursor-pointer h-2 bg-white/30 rounded-lg"
            aria-label="Volume slider"
          />
          <span className="text-xs font-mono font-bold text-white/90 w-9 text-right">
            {Math.round((isMuted ? 0 : volume) * 100)}%
          </span>
        </div>

        <button
          type="button"
          onClick={forceReconnect}
          title="Reconnect audio stream cleanly"
          className="min-h-[44px] px-4 rounded-xl text-xs font-bold text-white bg-white/15 hover:bg-[#119e45] border border-white/25 inline-flex items-center gap-1.5 apple-spring active:scale-[0.96] shrink-0"
        >
          <RotateCw
            className={`w-3.5 h-3.5 ${isReconnecting ? "animate-spin" : ""}`}
          />
          <span>Reconnect</span>
        </button>
      </div>
    </div>
  );
}
