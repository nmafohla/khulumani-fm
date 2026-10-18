"use client";

import {
  Play,
  Pause,
  RotateCw,
  Volume2,
  VolumeX,
  ShieldCheck,
  Activity,
  Mic2,
} from "lucide-react";
import { useRadio } from "@/context/RadioPlayerContext";
import { useSiteContent } from "@/context/SiteContentContext";
import { formatUptime } from "@/lib/audioEngine";

export function PlayerConsole() {
  const {
    status,
    volume,
    isMuted,
    diagnostics,
    errorMessage,
    currentShow,
    togglePlay,
    setVolume,
    toggleMute,
    forceReconnect,
  } = useRadio();
  const { activeContent } = useSiteContent();
  const hero = activeContent.hero;

  const isPlaying = status === "playing";
  const isLoading = status === "loading";
  const isReconnecting = status === "reconnecting";

  const bars = [
    65, 40, 85, 35, 95, 70, 50, 80, 100, 45, 90, 60, 75, 55, 90, 40, 80, 65, 95,
    50, 70, 85, 45, 60,
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl border-2 border-khulumani-greenDark/30 shadow-2xl bg-khulumani-ink">
      {/* 1. Original Deep Emerald Textured "PLAY AND ROCK" Top Banner */}
      <div className="relative bg-play-and-rock overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#084723]/95 via-[#0d5c31]/90 to-[#0a4829]/95" />
        <div className="relative z-10 px-6 sm:px-10 pt-8 pb-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6 text-white">
          <div>
            <p className="text-xs sm:text-sm font-black uppercase tracking-[0.22em] text-amber-300">
              ENJOY OUR RADIO • {hero.badge}
            </p>
            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mt-1 drop-shadow">
              PLAY AND ROCK
            </h1>
            <div className="w-36 h-1.5 bg-white -skew-x-12 mt-2.5" />
            <p className="text-xs sm:text-sm text-white/90 mt-3 max-w-2xl font-medium">
              {hero.headline} — {hero.subtitle}
            </p>
          </div>

          <div className="flex flex-col sm:items-end gap-2.5 shrink-0">
            <div className="inline-flex flex-wrap items-center gap-3 px-4 py-2 rounded-full bg-black/35 border border-white/20 text-xs font-bold text-white">
              <span className="inline-flex items-center gap-1.5">
                <span
                  className={`inline-block h-2.5 w-2.5 rounded-full ${
                    isPlaying
                      ? "bg-amber-300 animate-ping"
                      : isReconnecting || isLoading
                        ? "bg-amber-300 animate-pulse"
                        : "bg-emerald-300"
                  }`}
                />
                <span>
                  {isPlaying
                    ? "LIVE 95.0 FM"
                    : isReconnecting
                      ? `RECOVERING (${diagnostics.attempts})`
                      : isLoading
                        ? "CONNECTING..."
                        : "READY TO STREAM"}
                </span>
              </span>
              <span className="inline-flex items-center gap-1 text-amber-300">
                <Activity className="w-3.5 h-3.5" />
                {diagnostics.bitrate}
              </span>
              <span className="inline-flex items-center gap-1 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                {formatUptime(diagnostics.totalUptimeSeconds)}
              </span>
            </div>
            <p className="text-[11px] font-semibold text-white/85 max-w-xs sm:text-right">
              {hero.announcement}
            </p>
          </div>
        </div>

        {/* Diagonal Cut + Grunge Strip at Bottom of Green Banner */}
        <div
          className="h-5 w-full bg-player-top-cut opacity-80"
          aria-hidden="true"
        />
      </div>

      {/* 2. Skewed White Parallelogram "NOW ON AIR" Badge Overlapping the Cut */}
      <div className="relative z-20 -mt-7 flex justify-center px-4">
        <div className="bg-white text-khulumani-ink font-black text-xl sm:text-2xl uppercase tracking-wider px-10 py-2.5 clip-skew-badge shadow-xl border-b-4 border-khulumani-tangelo">
          NOW ON AIR
        </div>
      </div>

      {/* 3. Full-Bleed Edison-Bulb & Cyan Studio Microphone Hero (show-banner.jpg) */}
      <div className="relative min-h-[380px] sm:min-h-[430px] -mt-5 pt-12 pb-8 px-6 sm:px-10 flex flex-col justify-between">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/show-banner.jpg"
          alt="Khulumani FM 95.0 On Air Studio Microphone and Edison Bulbs"
          width={1200}
          height={675}
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/65" />

        {/* Center Live Show Spotlight Matching Screenshot 1 */}
        <div className="relative z-10 my-auto py-6 flex flex-col items-center text-center text-white">
          <span className="px-3.5 py-0.5 border-2 border-[#14b8a6] text-[#2dd4bf] text-xs font-black uppercase tracking-[0.2em] bg-black/40">
            {currentShow.genre || "MIXED BAG"}
          </span>

          <span className="mt-3 px-5 py-1 border-2 border-white text-white text-xs sm:text-sm font-black uppercase tracking-[0.22em] bg-black/35">
            NOW ON AIR
          </span>

          <h2 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white drop-shadow-lg">
            {currentShow.title}
          </h2>

          <p className="mt-2 inline-flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-amber-300">
            <Mic2 className="w-4 h-4 text-[#2dd4bf]" />
            <span>
              {currentShow.daysLabel} • {currentShow.timeLabel} CAT • WITH{" "}
              {currentShow.presenter}
            </span>
          </p>

          <p className="mt-2 text-xs sm:text-sm text-white/85 max-w-2xl">
            {currentShow.description}
          </p>
        </div>

        {/* Interactive Audio Controls Bar Inside Studio Hero */}
        <div className="relative z-10 mt-4 pt-5 border-t border-white/20 bg-black/55 backdrop-blur-md rounded-2xl p-4 sm:px-6 flex flex-col lg:flex-row items-center justify-between gap-5 text-white">
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <button
              onClick={togglePlay}
              disabled={isLoading || isReconnecting}
              className={`relative flex items-center justify-center w-16 h-16 rounded-2xl transition-all transform active:scale-95 shadow-lg shrink-0 ${
                isPlaying
                  ? "bg-khulumani-tangelo hover:bg-orange-600 text-white"
                  : "bg-khulumani-green hover:bg-khulumani-greenDark text-white"
              }`}
              aria-label={
                isPlaying ? "Pause Khulumani FM" : "Play Khulumani FM 95.0"
              }
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 fill-current" />
              ) : (
                <Play className="w-8 h-8 fill-current ml-0.5" />
              )}
            </button>

            <div className="min-w-0">
              <span className="text-[11px] font-black uppercase tracking-widest text-amber-300 block">
                {isPlaying ? "STREAMING LIVE 95.0 FM" : "CLICK PLAY TO LISTEN"}
              </span>
              <p className="text-sm sm:text-base font-black text-white truncate">
                {currentShow.title} — {currentShow.presenter}
              </p>
              <p className="text-xs text-white/75 truncate">
                Montrose Studios, Bulawayo • 24/7 Watchdog Stream
              </p>
            </div>
          </div>

          {/* Animated Equalizer Bars */}
          <div className="flex items-end justify-center gap-1 h-11 w-full sm:w-52 px-3 py-2 rounded-xl bg-white/10 border border-white/15">
            {bars.map((maxHeight, index) => {
              const heightPct = isPlaying ? maxHeight : 20;
              const duration = 0.45 + (index % 5) * 0.14;
              return (
                <div
                  key={index}
                  className="w-1.5 rounded-full transition-all bg-gradient-to-t from-khulumani-green to-amber-300"
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

          {/* Volume + Reconnect */}
          <div className="flex items-center justify-between sm:justify-end gap-4 w-full lg:w-auto">
            <div className="flex items-center gap-2 flex-1 sm:w-44">
              <button
                onClick={toggleMute}
                className="p-2 rounded-xl text-white hover:bg-white/15 transition-colors"
                aria-label={isMuted ? "Unmute audio" : "Mute audio"}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-5 h-5 text-red-400" />
                ) : (
                  <Volume2 className="w-5 h-5 text-amber-300" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer h-1.5 bg-white/30 rounded-lg"
                aria-label="Volume slider"
              />
              <span className="text-xs font-mono font-bold text-white/90 w-9 text-right">
                {Math.round((isMuted ? 0 : volume) * 100)}%
              </span>
            </div>

            <button
              onClick={forceReconnect}
              title="Reconnect audio stream cleanly"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-white/15 hover:bg-khulumani-green border border-white/25 transition-colors shrink-0"
            >
              <RotateCw
                className={`w-3.5 h-3.5 ${isReconnecting ? "animate-spin" : ""}`}
              />
              <span>Reconnect</span>
            </button>
          </div>
        </div>

        {errorMessage && (
          <div className="relative z-10 mt-3 p-3 rounded-xl bg-amber-950/90 border border-amber-400/50 text-amber-100 text-xs flex items-center justify-between">
            <span>
              Stream interrupted ({errorMessage}). Watchdog is reconnecting
              automatically...
            </span>
            <button
              onClick={forceReconnect}
              className="underline font-extrabold text-amber-300 ml-2"
            >
              Retry Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
