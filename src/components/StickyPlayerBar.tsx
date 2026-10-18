"use client";

import { useState } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCw,
  ShieldCheck,
  ChevronUp,
} from "lucide-react";
import { useRadio } from "@/context/RadioPlayerContext";
import { formatUptime } from "@/lib/audioEngine";
import { AppleNowPlayingSheet } from "@/components/AppleNowPlayingSheet";

export function StickyPlayerBar() {
  const {
    status,
    volume,
    isMuted,
    diagnostics,
    currentShow,
    togglePlay,
    setVolume,
    toggleMute,
    forceReconnect,
  } = useRadio();

  const [sheetOpen, setSheetOpen] = useState<boolean>(false);

  const isPlaying = status === "playing";
  const isReconnecting = status === "reconnecting";
  const isLoading = status === "loading";

  return (
    <>
      <div className="fixed bottom-0 inset-x-0 z-50 bg-[#06150f]/90 backdrop-blur-2xl border-t border-white/15 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Left: Spinning Platter + Play/Pause + Show Info */}
          <div className="flex items-center gap-3.5 min-w-0">
            <button
              type="button"
              onClick={togglePlay}
              className={`min-w-[48px] min-h-[48px] rounded-2xl flex items-center justify-center shrink-0 shadow-lg apple-spring active:scale-[0.96] ${
                isPlaying
                  ? "bg-[#c24b00] text-white"
                  : "bg-khulumani-green hover:bg-khulumani-greenDark text-white"
              }`}
              aria-label={isPlaying ? "Pause Live Stream" : "Play Live Stream"}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setSheetOpen(true)}
              className="flex items-center gap-3 min-w-0 text-left group apple-spring active:scale-[0.98]"
              aria-label="Open Full Now Playing Studio Sheet"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/afro-pulse-disc.webp"
                alt=""
                width={44}
                height={44}
                className={`hidden sm:block w-11 h-11 rounded-full object-cover border border-white/25 shrink-0 ${
                  isPlaying ? "animate-spin-slow" : ""
                }`}
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${
                      isPlaying
                        ? "bg-amber-300 animate-ping"
                        : isReconnecting || isLoading
                          ? "bg-amber-400 animate-pulse"
                          : "bg-emerald-400"
                    }`}
                  />
                  <span className="text-[11px] font-black uppercase tracking-wider text-emerald-300">
                    {isPlaying
                      ? "LIVE 95.0 FM • TAP TO EXPAND"
                      : isReconnecting
                        ? "AUTO-RECONNECTING..."
                        : isLoading
                          ? "BUFFERING..."
                          : "KHULUMANI FM 95.0"}
                  </span>
                </div>
                <p className="text-sm sm:text-base font-black text-white truncate group-hover:text-amber-300 transition-colors">
                  {currentShow.title}{" "}
                  <span className="font-semibold text-white/75 text-xs sm:text-sm">
                    • {currentShow.presenter}
                  </span>
                </p>
              </div>
            </button>
          </div>

          {/* Center: Watchdog Status Pill */}
          <div className="hidden lg:flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-white/90">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>192 kbps AAC</span>
            <span>•</span>
            <span className="font-mono text-amber-300">
              {formatUptime(diagnostics.totalUptimeSeconds)}
            </span>
          </div>

          {/* Right: Volume, Reconnect & Expand Studio Sheet */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="hidden md:flex items-center gap-2 w-36">
              <button
                type="button"
                onClick={toggleMute}
                className="min-w-[44px] min-h-[44px] rounded-xl text-white/80 hover:text-white hover:bg-white/10 flex items-center justify-center apple-spring active:scale-[0.96]"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-red-400" />
                ) : (
                  <Volume2 className="w-4 h-4 text-amber-300" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer h-1.5 bg-white/25 rounded-lg"
                aria-label="Mini player volume"
              />
            </div>

            <button
              type="button"
              onClick={forceReconnect}
              title="Refresh live stream connection"
              className="min-h-[44px] px-3.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/15 inline-flex items-center gap-1.5 apple-spring active:scale-[0.96]"
            >
              <RotateCw
                className={`w-3.5 h-3.5 text-emerald-300 ${isReconnecting ? "animate-spin" : ""}`}
              />
              <span className="hidden sm:inline">Resync</span>
            </button>

            <button
              type="button"
              onClick={() => setSheetOpen(true)}
              aria-label="Expand Full Studio Sheet"
              className="min-h-[44px] min-w-[44px] px-3.5 rounded-xl text-xs font-black uppercase tracking-wider bg-emerald-500/20 hover:bg-emerald-500/35 text-emerald-300 border border-emerald-400/35 inline-flex items-center justify-center gap-1 apple-spring active:scale-[0.96]"
            >
              <ChevronUp className="w-4 h-4" />
              <span className="hidden sm:inline">Studio</span>
            </button>
          </div>
        </div>
      </div>

      <AppleNowPlayingSheet
        isOpen={sheetOpen}
        onClose={() => setSheetOpen(false)}
      />
    </>
  );
}
