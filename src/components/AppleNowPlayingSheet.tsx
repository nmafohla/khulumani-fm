"use client";

import {
  Play,
  Pause,
  RotateCw,
  Volume2,
  VolumeX,
  X,
  Radio,
  Mic2,
  MessageCircle,
  ShieldCheck,
  Activity,
  Sparkles,
} from "lucide-react";
import { useRadio } from "@/context/RadioPlayerContext";
import { useSiteContent } from "@/context/SiteContentContext";
import { formatUptime } from "@/lib/audioEngine";
import { BroadcastMotionCanvas } from "@/components/BroadcastMotionCanvas";

interface AppleNowPlayingSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AppleNowPlayingSheet({
  isOpen,
  onClose,
}: AppleNowPlayingSheetProps) {
  const {
    status,
    volume,
    isMuted,
    diagnostics,
    currentShow,
    nextShow,
    togglePlay,
    setVolume,
    toggleMute,
    forceReconnect,
  } = useRadio();
  const { activeContent } = useSiteContent();
  const contacts = activeContent.contacts;
  const isPlaying = status === "playing";
  const isReconnecting = status === "reconnecting";

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-black/70 backdrop-blur-md transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-label="Khulumani FM 95.0 Full Studio Broadcast Sheet"
    >
      {/* Backdrop click to dismiss */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      {/* Apple HIG Slide-Up Sheet with cubic-bezier(0.32, 0.72, 0, 1) spring motion */}
      <div className="relative z-10 w-full max-w-4xl rounded-t-[36px] bg-[#071510]/95 border-t border-x border-white/15 text-white shadow-2xl overflow-hidden apple-sheet-enter max-h-[92vh] overflow-y-auto">
        <BroadcastMotionCanvas isPlaying={isPlaying} />

        {/* iOS Pill Drag Handle & Close Button */}
        <div className="relative z-10 pt-3 pb-2 px-6 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-emerald-300">
            <Sparkles className="w-3.5 h-3.5" />
            Apple Radio Studio Mode • 95.0 FM
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Minimize Now Playing Sheet"
            className="w-12 h-6 flex items-center justify-center touch-manipulation active:scale-[0.96] transition-transform duration-150"
          >
            <span className="w-11 h-1.5 rounded-full bg-white/35 hover:bg-white/60 transition-colors" />
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Studio Sheet"
            className="min-w-[44px] min-h-[44px] rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center touch-manipulation active:scale-[0.96] transition-transform duration-150"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Studio Platter + Live Show Info */}
        <div className="relative z-10 px-6 sm:px-10 pb-10 pt-2 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Spinning Broadcast Disc Platter */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full p-2 bg-gradient-to-tr from-emerald-500/40 via-amber-400/30 to-teal-400/40 shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/afro-pulse-disc.webp"
                alt="Khulumani FM 95.0 Broadcast Platter"
                width={256}
                height={256}
                className={`w-full h-full rounded-full object-cover border-2 border-white/20 shadow-inner ${
                  isPlaying ? "animate-spin-slow" : ""
                }`}
              />
              <div className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-[#071510] border-2 border-amber-300/70 flex items-center justify-center shadow-lg">
                <Radio className="w-5 h-5 text-amber-300" />
              </div>
            </div>

            <div className="mt-4 inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold">
              <span className="inline-flex items-center gap-1 text-amber-300">
                <Activity className="w-3.5 h-3.5" />
                {diagnostics.bitrate}
              </span>
              <span className="inline-flex items-center gap-1 font-mono text-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5" />
                {formatUptime(diagnostics.totalUptimeSeconds)}
              </span>
            </div>
          </div>

          {/* Right Live Show Metadata & Tactile Controls */}
          <div className="md:col-span-7 space-y-5">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-black uppercase tracking-widest">
                  LIVE ON 95.0 FM
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold">
                  {currentShow.timeLabel} CAT
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mt-3">
                {currentShow.title}
              </h2>

              <p className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-emerald-300 mt-1">
                <Mic2 className="w-4 h-4" />
                <span>
                  Hosted by {currentShow.presenter} • {currentShow.daysLabel}
                </span>
              </p>

              <p className="text-xs sm:text-sm text-white/80 mt-2 leading-relaxed">
                {currentShow.description}
              </p>
            </div>

            {/* Apple HIG 44px+ Transport & Volume Bar */}
            <div className="p-4 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/15 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={
                    isPlaying ? "Pause live broadcast" : "Play live broadcast"
                  }
                  className={`min-h-[56px] px-7 rounded-2xl font-black text-sm uppercase tracking-wider inline-flex items-center gap-3 shadow-lg touch-manipulation active:scale-[0.96] transition-transform duration-150 ${
                    isPlaying
                      ? "bg-[#c24b00] text-white"
                      : "bg-emerald-500 hover:bg-emerald-400 text-slate-950"
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-6 h-6 fill-current" />
                      <span>Pause Live Stream</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-6 h-6 fill-current" />
                      <span>Play Live 95.0 FM</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={forceReconnect}
                  className="min-h-[48px] min-w-[48px] px-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold inline-flex items-center gap-2 touch-manipulation active:scale-[0.96] transition-transform duration-150"
                >
                  <RotateCw
                    className={`w-4 h-4 ${isReconnecting ? "animate-spin" : ""}`}
                  />
                  <span>Resync</span>
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute" : "Mute"}
                  className="min-w-[44px] min-h-[44px] rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center touch-manipulation active:scale-[0.96] transition-transform duration-150"
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
                  aria-label="Studio Sheet Volume"
                  className="w-full accent-emerald-400 cursor-pointer h-2 bg-white/25 rounded-lg"
                />
                <span className="text-xs font-mono font-bold text-white/90 w-10 text-right">
                  {Math.round((isMuted ? 0 : volume) * 100)}%
                </span>
              </div>
            </div>

            {/* Up Next & Instant WhatsApp Dedication Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
              <div className="px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-xs">
                <span className="text-white/60 uppercase font-bold tracking-wider block">
                  Up Next ({nextShow.timeLabel})
                </span>
                <span className="font-black text-white">
                  {nextShow.title} — {nextShow.presenter}
                </span>
              </div>

              <a
                href={contacts.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-wider inline-flex items-center justify-center gap-2 touch-manipulation active:scale-[0.96] transition-transform duration-150"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send Live Dedication</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
