"use client";

import {
  Play,
  Pause,
  RotateCw,
  Volume2,
  VolumeX,
  ShieldCheck,
  Activity,
} from "lucide-react";
import type { StreamStatus, StreamDiagnostics } from "@/types/radio";
import { formatUptime } from "@/lib/audioEngine";

interface PlayerConsoleProps {
  status: StreamStatus;
  volume: number;
  isMuted: boolean;
  diagnostics: StreamDiagnostics;
  errorMessage: string | null;
  currentShowTitle: string;
  onTogglePlay: () => void;
  onSetVolume: (val: number) => void;
  onToggleMute: () => void;
  onForceReconnect: () => void;
}

export function PlayerConsole({
  status,
  volume,
  isMuted,
  diagnostics,
  errorMessage,
  currentShowTitle,
  onTogglePlay,
  onSetVolume,
  onToggleMute,
  onForceReconnect,
}: PlayerConsoleProps) {
  const isPlaying = status === "playing";
  const isLoading = status === "loading";
  const isReconnecting = status === "reconnecting";

  // Visualizer bars
  const bars = [
    65, 40, 85, 30, 95, 70, 50, 80, 100, 45, 90, 60, 75, 55, 90, 40, 80, 65, 95,
    50, 70, 85, 45, 60,
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-station-card to-station-dark border border-station-border p-6 sm:p-10 shadow-2xl shadow-black/80">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-station-gold/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-station-teal/10 blur-3xl pointer-events-none" />

      {/* Connection & Watchdog Status Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-6 border-b border-station-border/60">
        <div className="flex items-center gap-2">
          <span
            className={`flex h-2.5 w-2.5 rounded-full ${
              isPlaying
                ? "bg-emerald-400 animate-pulse"
                : isReconnecting
                  ? "bg-amber-400 animate-ping"
                  : isLoading
                    ? "bg-sky-400 animate-pulse"
                    : "bg-station-muted"
            }`}
          />
          <span className="text-xs font-semibold uppercase tracking-wider text-station-muted">
            {isPlaying
              ? "Stream Healthy & Active"
              : isReconnecting
                ? `Auto-recovering feed (Attempt ${diagnostics.attempts})...`
                : isLoading
                  ? "Establishing Live Connection..."
                  : "Ready to Broadcast"}
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-station-muted">
          <span className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-station-gold" />
            {diagnostics.bitrate}
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-station-teal" />
            Uptime: {formatUptime(diagnostics.totalUptimeSeconds)}
          </span>
          {diagnostics.reconnectCount > 0 && (
            <span className="text-amber-400/90 text-[11px]">
              (Auto-recovered: {diagnostics.reconnectCount}x)
            </span>
          )}
        </div>
      </div>

      {/* Main Console Center */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 my-4">
        {/* Play Button & Title */}
        <div className="flex items-center gap-6 w-full md:w-auto">
          <button
            onClick={onTogglePlay}
            disabled={isLoading || isReconnecting}
            className={`relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-2xl transition-all transform active:scale-95 shadow-xl ${
              isPlaying
                ? "bg-station-gold text-station-dark hover:bg-amber-400 shadow-station-gold/25"
                : "bg-white text-station-dark hover:bg-station-gold hover:text-station-dark shadow-white/10"
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

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-station-gold/20 text-station-gold uppercase tracking-wider">
                Now Streaming
              </span>
              <span className="text-xs text-station-muted">
                95.0 FM Bulawayo
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1 line-clamp-1">
              {currentShowTitle}
            </h2>
            <p className="text-xs text-station-muted mt-0.5">
              Live from Montrose Studios • Direct High-Fidelity Audio Feed
            </p>
          </div>
        </div>

        {/* Visualizer Soundwave */}
        <div className="flex items-end justify-center gap-1 sm:gap-1.5 h-16 w-full md:w-64 px-4 py-2 rounded-xl bg-station-dark/70 border border-station-border/50">
          {bars.map((maxHeight, index) => {
            const heightPct = isPlaying ? maxHeight : 12;
            const duration = 0.5 + (index % 5) * 0.15;
            return (
              <div
                key={index}
                className="w-1.5 sm:w-2 rounded-full transition-all bg-gradient-to-t from-station-gold to-amber-300"
                style={{
                  height: `${heightPct}%`,
                  opacity: isPlaying ? 0.9 : 0.25,
                  animation: isPlaying
                    ? `pulseWave ${duration}s ease-in-out infinite alternate`
                    : "none",
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Controls Bar: Volume & Watchdog Reset */}
      <div className="mt-8 pt-6 border-t border-station-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Volume controls */}
        <div className="flex items-center gap-3 w-full sm:w-72">
          <button
            onClick={onToggleMute}
            className="p-2 rounded-lg text-station-muted hover:text-white hover:bg-station-border/50 transition-colors"
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-5 h-5 text-station-red" />
            ) : (
              <Volume2 className="w-5 h-5 text-station-gold" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={(e) => onSetVolume(parseFloat(e.target.value))}
            className="w-full accent-station-gold cursor-pointer h-1.5 bg-station-border rounded-lg"
            aria-label="Volume slider"
          />
          <span className="text-xs font-mono text-station-muted w-8 text-right">
            {Math.round((isMuted ? 0 : volume) * 100)}%
          </span>
        </div>

        {/* Watchdog Reconnect Trigger */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            onClick={onForceReconnect}
            title="Clean reconnect to bypass any stream freeze or buffer stall"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-station-muted hover:text-white bg-station-dark/80 hover:bg-station-dark border border-station-border transition-all active:scale-95"
          >
            <RotateCw
              className={`w-3.5 h-3.5 text-station-gold ${
                isReconnecting ? "animate-spin" : ""
              }`}
            />
            <span>Refresh Audio Feed</span>
          </button>
        </div>
      </div>

      {/* Error or Stall Recovery Notice */}
      {errorMessage && (
        <div className="mt-4 p-3 rounded-xl bg-station-red/10 border border-station-red/30 text-station-red text-xs flex items-center justify-between">
          <span>
            Stream interruption detected: {errorMessage}. Auto-recovery watchdog
            is reconnecting...
          </span>
          <button
            onClick={onForceReconnect}
            className="underline font-bold hover:text-white ml-2"
          >
            Retry now
          </button>
        </div>
      )}
    </div>
  );
}
