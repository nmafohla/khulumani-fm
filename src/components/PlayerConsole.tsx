"use client";

import { useState } from "react";
import {
  Play,
  Pause,
  ShieldCheck,
  Activity,
  Mic2,
  Maximize2,
  Sparkles,
  Radio,
} from "lucide-react";
import { useRadio } from "@/context/RadioPlayerContext";
import { useSiteContent } from "@/context/SiteContentContext";
import { formatUptime } from "@/lib/audioEngine";
import { BroadcastMotionCanvas } from "@/components/BroadcastMotionCanvas";
import { AppleNowPlayingSheet } from "@/components/AppleNowPlayingSheet";
import { PlayerTransportBar } from "@/components/PlayerTransportBar";

export function PlayerConsole() {
  const {
    status,
    diagnostics,
    errorMessage,
    currentShow,
    nextShow,
    togglePlay,
    forceReconnect,
  } = useRadio();
  const { activeContent } = useSiteContent();
  const hero = activeContent.hero;

  const [studioMode, setStudioMode] = useState<"apple" | "classic">("apple");
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);

  const isPlaying = status === "playing";
  const isLoading = status === "loading";
  const isReconnecting = status === "reconnecting";

  return (
    <>
      <div className="relative overflow-hidden rounded-[32px] border border-white/15 shadow-2xl bg-[#06130e] text-white">
        {/* Top Emerald "PLAY AND ROCK" + Segmented Apple HIG Mode Switcher */}
        <div className="relative bg-play-and-rock overflow-hidden border-b border-white/15">
          <div className="absolute inset-0 bg-gradient-to-r from-[#062e18]/95 via-[#0b4d28]/90 to-[#073322]/95" />
          <div className="relative z-10 px-6 sm:px-10 py-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-amber-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ENJOY OUR RADIO • {hero.badge}</span>
              </div>
              <div className="flex flex-wrap items-baseline gap-4 mt-1">
                <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white drop-shadow">
                  PLAY AND ROCK
                </h1>
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-emerald-300">
                  {hero.headline} • 95.0 MHz
                </span>
              </div>
              <div className="w-32 h-1 bg-gradient-to-r from-amber-300 to-emerald-400 -skew-x-12 mt-2" />
            </div>

            {/* Apple HIG Segmented Visual Mode Switcher + Expand Sheet Button */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div
                className="inline-flex p-1 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/15"
                role="group"
                aria-label="Broadcast Visual Theme"
              >
                <button
                  type="button"
                  onClick={() => setStudioMode("apple")}
                  className={`min-h-[44px] px-4 rounded-xl text-xs font-black uppercase tracking-wider apple-spring active:scale-[0.96] ${
                    studioMode === "apple"
                      ? "bg-white text-slate-950 shadow"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  Apple Radio Motion
                </button>
                <button
                  type="button"
                  onClick={() => setStudioMode("classic")}
                  className={`min-h-[44px] px-4 rounded-xl text-xs font-black uppercase tracking-wider apple-spring active:scale-[0.96] ${
                    studioMode === "classic"
                      ? "bg-white text-slate-950 shadow"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  Classic 95.0 Studio
                </button>
              </div>

              <button
                type="button"
                onClick={() => setSheetOpen(true)}
                className="min-h-[44px] px-4 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/20 text-xs font-black uppercase tracking-wider inline-flex items-center gap-2 apple-spring active:scale-[0.96]"
              >
                <Maximize2 className="w-3.5 h-3.5 text-amber-300" />
                <span>Studio Sheet</span>
              </button>
            </div>
          </div>
        </div>

        {/* Skewed White "NOW ON AIR" Badge */}
        <div className="relative z-20 -mt-4 flex justify-center px-4">
          <div className="bg-white text-khulumani-ink font-black text-base sm:text-lg uppercase tracking-wider px-8 py-1.5 clip-skew-badge shadow-xl border-b-4 border-[#c24b00]">
            NOW ON AIR • 95.0 FM
          </div>
        </div>

        {/* Main Flagship Broadcast Stage */}
        <div className="relative min-h-[410px] -mt-4 pt-10 pb-8 px-6 sm:px-10 flex flex-col justify-between">
          {/* Background Image Layer (Nano Banana Apple Radio Hero OR Classic Edison-Bulb Studio) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={
              studioMode === "apple"
                ? "/images/apple-radio-hero.webp"
                : "/images/show-banner.jpg"
            }
            alt="Khulumani FM 95.0 Live Broadcast Studio"
            width={1280}
            height={720}
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#04100b]/92 via-[#061811]/75 to-[#04100b]/88" />

          {/* Interactive 60fps Volumetric FM Motion Graphics Canvas */}
          <BroadcastMotionCanvas isPlaying={isPlaying} />

          {/* Center Grid: Left Live Show Stage + Right Spinning Broadcast Platter */}
          <div className="relative z-10 my-auto py-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 text-xs font-black uppercase tracking-widest">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isPlaying ? "bg-amber-300 animate-ping" : "bg-emerald-400"
                    }`}
                  />
                  {isPlaying ? "ON AIR LIVE" : "LIVE STREAM READY"}
                </span>
                <span className="px-3 py-1 border border-[#14b8a6] text-[#2dd4bf] text-xs font-black uppercase tracking-widest bg-black/40">
                  {currentShow.genre || "MIXED BAG"}
                </span>
                <span className="text-xs font-mono font-bold text-amber-300 bg-black/40 px-3 py-1 rounded-full border border-white/10">
                  {currentShow.timeLabel} CAT
                </span>
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.03] drop-shadow-lg">
                {currentShow.title}
              </h2>

              <p className="inline-flex flex-wrap items-center gap-2 text-sm sm:text-base font-extrabold text-amber-300">
                <Mic2 className="w-4 h-4 text-emerald-400" />
                <span>
                  Hosted by {currentShow.presenter} • {currentShow.daysLabel}
                </span>
              </p>

              <p className="text-xs sm:text-sm text-white/85 max-w-2xl leading-relaxed">
                {currentShow.description}
              </p>

              {/* Apple Music Radio "Up Next" Glass Pill */}
              <div className="pt-1 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-xs">
                  <span className="text-emerald-300 font-black uppercase tracking-wider">
                    Up Next:
                  </span>
                  <span className="font-bold text-white">
                    {nextShow.title} ({nextShow.timeLabel})
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-white/80">
                  <Activity className="w-3.5 h-3.5 text-amber-300" />
                  {diagnostics.bitrate} •{" "}
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  {formatUptime(diagnostics.totalUptimeSeconds)}
                </span>
              </div>
            </div>

            {/* Right Column: Spinning Nano Banana Afro-Pulse Platter */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full p-2 bg-gradient-to-tr from-emerald-500/40 via-amber-400/30 to-teal-400/40 shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/afro-pulse-disc.webp"
                  alt="Khulumani FM 95.0 Afro-Pulse Broadcast Platter"
                  width={224}
                  height={224}
                  className={`w-full h-full rounded-full object-cover border-2 border-white/25 ${
                    isPlaying ? "animate-spin-slow" : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={togglePlay}
                  disabled={isLoading || isReconnecting}
                  aria-label={
                    isPlaying
                      ? "Pause Khulumani FM 95.0"
                      : "Play Khulumani FM 95.0"
                  }
                  className={`absolute inset-0 m-auto w-16 h-16 rounded-full flex items-center justify-center shadow-2xl border-2 border-white/40 apple-spring active:scale-[0.96] ${
                    isPlaying
                      ? "bg-[#c24b00] hover:bg-orange-600 text-white"
                      : "bg-emerald-500 hover:bg-emerald-400 text-slate-950"
                  }`}
                >
                  {isPlaying ? (
                    <Pause className="w-7 h-7 fill-current" />
                  ) : (
                    <Play className="w-7 h-7 fill-current ml-0.5" />
                  )}
                </button>
              </div>
              <span className="mt-2.5 text-[11px] font-black uppercase tracking-widest text-emerald-300 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-amber-300" />
                {isPlaying ? "Live Platter Spinning" : "Tap Platter to Stream"}
              </span>
            </div>
          </div>

          <PlayerTransportBar />

          {errorMessage && (
            <div className="relative z-10 mt-3 p-3 rounded-xl bg-amber-950/90 border border-amber-400/50 text-amber-100 text-xs flex items-center justify-between">
              <span>
                Stream interrupted ({errorMessage}). Watchdog is reconnecting...
              </span>
              <button
                type="button"
                onClick={forceReconnect}
                className="min-h-[44px] px-3 underline font-extrabold text-amber-300"
              >
                Retry Now
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Apple HIG Slide-Up Studio Broadcast Sheet */}
      <AppleNowPlayingSheet
        isOpen={sheetOpen}
        onClose={() => setSheetOpen(false)}
      />
    </>
  );
}
