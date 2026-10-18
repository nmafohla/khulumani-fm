"use client";

import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCw,
  ShieldCheck,
} from "lucide-react";
import { useRadio } from "@/context/RadioPlayerContext";
import { formatUptime } from "@/lib/audioEngine";

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

  const isPlaying = status === "playing";
  const isReconnecting = status === "reconnecting";
  const isLoading = status === "loading";

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-t-2 border-khulumani-green shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Left: Play/Pause + Show Info */}
        <div className="flex items-center gap-3.5 min-w-0">
          <button
            onClick={togglePlay}
            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all shadow-md active:scale-95 ${
              isPlaying
                ? "bg-khulumani-tangelo text-white shadow-khulumani-tangelo/30"
                : "bg-khulumani-green hover:bg-khulumani-greenDark text-white shadow-khulumani-green/30"
            }`}
            aria-label={isPlaying ? "Pause Live Stream" : "Play Live Stream"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span
                className={`inline-block w-2 h-2 rounded-full ${
                  isPlaying
                    ? "bg-khulumani-green animate-ping"
                    : isReconnecting || isLoading
                      ? "bg-amber-500 animate-pulse"
                      : "bg-slate-400"
                }`}
              />
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-khulumani-greenDark">
                {isPlaying
                  ? "Live 95.0 FM"
                  : isReconnecting
                    ? "Auto-Reconnecting..."
                    : isLoading
                      ? "Buffering..."
                      : "Khulumani FM 95.0"}
              </span>
            </div>
            <p className="text-sm sm:text-base font-extrabold text-khulumani-ink truncate">
              {currentShow.title}{" "}
              <span className="font-medium text-khulumani-muted text-xs sm:text-sm">
                with {currentShow.presenter}
              </span>
            </p>
          </div>
        </div>

        {/* Center: Watchdog Status Pill */}
        <div className="hidden lg:flex items-center gap-3 px-3.5 py-1.5 rounded-xl bg-khulumani-greenLight border border-khulumani-border text-xs font-medium text-khulumani-greenDark">
          <ShieldCheck className="w-4 h-4 text-khulumani-green shrink-0" />
          <span>192 kbps Stereo</span>
          <span>•</span>
          <span className="font-mono">
            Uptime: {formatUptime(diagnostics.totalUptimeSeconds)}
          </span>
          {diagnostics.reconnectCount > 0 && (
            <span className="text-khulumani-tangelo font-bold">
              • Auto-healed {diagnostics.reconnectCount}x
            </span>
          )}
        </div>

        {/* Right: Volume & Reconnect */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <div className="hidden sm:flex items-center gap-2 w-36">
            <button
              onClick={toggleMute}
              className="p-1.5 rounded-lg text-khulumani-muted hover:text-khulumani-ink hover:bg-khulumani-greenLight"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-red-500" />
              ) : (
                <Volume2 className="w-4 h-4 text-khulumani-green" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full accent-khulumani-green cursor-pointer h-1.5 bg-khulumani-border rounded-lg"
              aria-label="Volume"
            />
          </div>

          <button
            onClick={forceReconnect}
            title="Refresh live stream connection"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-khulumani-bg hover:bg-khulumani-greenLight text-khulumani-ink border border-khulumani-border transition-colors"
          >
            <RotateCw
              className={`w-3.5 h-3.5 text-khulumani-green ${isReconnecting ? "animate-spin" : ""}`}
            />
            <span className="hidden md:inline">Refresh Feed</span>
          </button>
        </div>
      </div>
    </div>
  );
}
