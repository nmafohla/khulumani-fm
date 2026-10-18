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

  const isPlaying = status === "playing";
  const isLoading = status === "loading";
  const isReconnecting = status === "reconnecting";

  const bars = [
    65, 40, 85, 35, 95, 70, 50, 80, 100, 45, 90, 60, 75, 55, 90, 40, 80, 65, 95,
    50, 70, 85, 45, 60,
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white border-2 border-khulumani-border shadow-xl">
      {/* Top Green Accent Ribbon */}
      <div className="bg-gradient-to-r from-khulumani-greenDark via-khulumani-green to-khulumani-teal px-6 sm:px-8 py-3.5 text-white flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span
            className={`inline-block h-3 w-3 rounded-full ${
              isPlaying
                ? "bg-amber-300 animate-ping"
                : isReconnecting || isLoading
                  ? "bg-amber-300 animate-pulse"
                  : "bg-white/60"
            }`}
          />
          <span className="text-xs font-extrabold uppercase tracking-wider">
            {isPlaying
              ? "Live Broadcast • 95.0 FM Bulawayo"
              : isReconnecting
                ? `Auto-Recovering Stream (Attempt ${diagnostics.attempts})...`
                : isLoading
                  ? "Connecting to Montrose Studios..."
                  : "Enjoy Our Radio • Play & Rock Now On Air"}
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold text-white/95">
          <span className="inline-flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-amber-300" />
            {diagnostics.bitrate}
          </span>
          <span className="inline-flex items-center gap-1.5 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
            Uptime: {formatUptime(diagnostics.totalUptimeSeconds)}
          </span>
          {diagnostics.reconnectCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-black/25 text-amber-200 text-[11px]">
              Auto-healed: {diagnostics.reconnectCount}x
            </span>
          )}
        </div>
      </div>

      {/* Main Console Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left/Center Controls */}
        <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <button
              onClick={togglePlay}
              disabled={isLoading || isReconnecting}
              className={`relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-3xl transition-all transform active:scale-95 shadow-lg shrink-0 ${
                isPlaying
                  ? "bg-khulumani-tangelo hover:bg-orange-600 text-white shadow-khulumani-tangelo/30"
                  : "bg-khulumani-green hover:bg-khulumani-greenDark text-white shadow-khulumani-green/30"
              }`}
              aria-label={
                isPlaying ? "Pause Khulumani FM" : "Play Khulumani FM 95.0"
              }
            >
              {isPlaying ? (
                <Pause className="w-10 h-10 fill-current" />
              ) : (
                <Play className="w-10 h-10 fill-current ml-1" />
              )}
            </button>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-khulumani-greenLight text-khulumani-greenDark uppercase tracking-wider">
                  Now On Air
                </span>
                <span className="text-xs font-bold text-khulumani-tangelo">
                  {currentShow.timeLabel} CAT
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-khulumani-ink mt-1.5 tracking-tight">
                {currentShow.title}
              </h2>

              <p className="inline-flex items-center gap-1.5 text-sm font-bold text-khulumani-greenDark mt-1">
                <Mic2 className="w-4 h-4 text-khulumani-green" />
                <span>
                  {currentShow.daysLabel}, with {currentShow.presenter}
                </span>
              </p>

              <p className="text-xs sm:text-sm text-khulumani-muted mt-2 line-clamp-2">
                {currentShow.description}
              </p>
            </div>
          </div>

          {/* Soundwave Visualizer + Volume Bar */}
          <div className="mt-8 pt-6 border-t border-khulumani-border flex flex-col sm:flex-row items-center justify-between gap-5">
            {/* Animated Equalizer Bars */}
            <div className="flex items-end justify-center gap-1 h-12 w-full sm:w-56 px-3 py-2 rounded-2xl bg-khulumani-greenLight/70 border border-khulumani-border">
              {bars.map((maxHeight, index) => {
                const heightPct = isPlaying ? maxHeight : 18;
                const duration = 0.45 + (index % 5) * 0.14;
                return (
                  <div
                    key={index}
                    className="w-1.5 rounded-full transition-all bg-gradient-to-t from-khulumani-greenDark to-khulumani-green"
                    style={{
                      height: `${heightPct}%`,
                      opacity: isPlaying ? 0.95 : 0.35,
                      animation: isPlaying
                        ? `pulseWave ${duration}s ease-in-out infinite alternate`
                        : "none",
                    }}
                  />
                );
              })}
            </div>

            {/* Volume + Manual Refresh */}
            <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
              <div className="flex items-center gap-2.5 flex-1 sm:w-44">
                <button
                  onClick={toggleMute}
                  className="p-2 rounded-xl text-khulumani-ink hover:bg-khulumani-greenLight transition-colors"
                  aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-5 h-5 text-red-500" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-khulumani-green" />
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
                  aria-label="Volume slider"
                />
                <span className="text-xs font-mono font-bold text-khulumani-muted w-9 text-right">
                  {Math.round((isMuted ? 0 : volume) * 100)}%
                </span>
              </div>

              <button
                onClick={forceReconnect}
                title="Reconnect audio stream cleanly"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-khulumani-greenDark bg-khulumani-greenLight hover:bg-khulumani-green hover:text-white border border-khulumani-green/30 transition-colors shrink-0"
              >
                <RotateCw
                  className={`w-3.5 h-3.5 ${isReconnecting ? "animate-spin" : ""}`}
                />
                <span>Reconnect</span>
              </button>
            </div>
          </div>

          {errorMessage && (
            <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between">
              <span>
                Stream interrupted ({errorMessage}). Watchdog is reconnecting
                automatically...
              </span>
              <button
                onClick={forceReconnect}
                className="underline font-extrabold text-khulumani-greenDark ml-2"
              >
                Retry Now
              </button>
            </div>
          )}
        </div>

        {/* Right Studio Image Card */}
        <div className="lg:col-span-4 relative min-h-[220px] lg:min-h-full bg-khulumani-ink overflow-hidden flex items-end p-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/show-banner.jpg"
            alt="Khulumani FM 95.0 On Air Studio"
            className="absolute inset-0 w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="relative z-10 text-white">
            <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider bg-khulumani-tangelo text-white mb-2">
              Montrose Studios • 95.0 FM
            </span>
            <p className="text-lg font-extrabold leading-snug">
              Izwi Lethu, Igugu Lethu
            </p>
            <p className="text-xs text-white/80 mt-1">
              24/7 Uninterrupted Stream • Bulawayo, Zimbabwe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
