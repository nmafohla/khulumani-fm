"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { StreamStatus, StreamDiagnostics } from "@/types/radio";
import {
  DEFAULT_STREAM_URL,
  getStreamUrlWithCacheBust,
  calculateBackoffDelay,
  isPlaybackStalled,
} from "@/lib/audioEngine";

export interface RadioPlayerState {
  status: StreamStatus;
  volume: number;
  isMuted: boolean;
  diagnostics: StreamDiagnostics;
  errorMessage: string | null;
  togglePlay: () => void;
  setVolume: (val: number) => void;
  toggleMute: () => void;
  forceReconnect: () => void;
}

export function useRadioPlayer(
  streamUrl: string = DEFAULT_STREAM_URL,
  currentShowTitle: string = "Khulumani FM 95.0"
): RadioPlayerState {
  const [status, setStatus] = useState<StreamStatus>("idle");
  const [volume, setVolumeState] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [diagnostics, setDiagnostics] = useState<StreamDiagnostics>({
    attempts: 0,
    lastConnectedAt: null,
    totalUptimeSeconds: 0,
    reconnectCount: 0,
    bitrate: "192 kbps",
    codec: "MP3 Stereo (44.1 kHz)",
    latencyHealth: "good",
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastRecordedTimeRef = useRef<number>(0);
  const stallCountRef = useRef<number>(0);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptRef = useRef<number>(0);
  const isExplicitlyPausedRef = useRef<boolean>(true);

  // References to avoid stale closures in event handlers and effects
  const connectStreamRef = useRef<() => void>(() => {});
  const scheduleReconnectRef = useRef<() => void>(() => {});
  const pausePlaybackRef = useRef<() => void>(() => {});
  const resumePlaybackRef = useRef<() => void>(() => {});

  // Scheduled reconnection with exponential backoff
  const scheduleReconnect = useCallback(() => {
    if (isExplicitlyPausedRef.current) return;

    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }

    reconnectAttemptRef.current += 1;
    const attempt = reconnectAttemptRef.current;
    const delay = calculateBackoffDelay(attempt);

    setStatus("reconnecting");
    setDiagnostics((prev) => ({
      ...prev,
      reconnectCount: prev.reconnectCount + 1,
      attempts: attempt,
      latencyHealth: "stalled",
    }));

    reconnectTimeoutRef.current = setTimeout(() => {
      if (!isExplicitlyPausedRef.current) {
        connectStreamRef.current();
      }
    }, delay);
  }, []);

  scheduleReconnectRef.current = scheduleReconnect;

  // Connect or reconnect helper
  const connectStream = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    setStatus("loading");
    setErrorMessage(null);
    stallCountRef.current = 0;

    // Use fresh cache-busted URL to bypass Cloudflare/proxy timeouts
    const freshUrl = getStreamUrlWithCacheBust(streamUrl, Date.now());
    audio.src = freshUrl;
    audio.load();

    audio
      .play()
      .then(() => {
        setStatus("playing");
      })
      .catch((err: unknown) => {
        if (!isExplicitlyPausedRef.current) {
          const message =
            err instanceof Error ? err.message : "Playback blocked";
          setErrorMessage(message);
          scheduleReconnectRef.current();
        }
      });
  }, [streamUrl]);

  connectStreamRef.current = connectStream;

  const resumePlayback = useCallback(() => {
    isExplicitlyPausedRef.current = false;
    connectStreamRef.current();
  }, []);
  resumePlaybackRef.current = resumePlayback;

  const pausePlayback = useCallback(() => {
    isExplicitlyPausedRef.current = true;
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.src = "";
    }
    setStatus("paused");
  }, []);
  pausePlaybackRef.current = pausePlayback;

  // Set up audio element and event handlers
  useEffect(() => {
    const audio = new Audio();
    audio.preload = "none";
    audio.volume = 0.85;
    audioRef.current = audio;

    const handlePlaying = () => {
      setStatus("playing");
      setErrorMessage(null);
      stallCountRef.current = 0;
      reconnectAttemptRef.current = 0;
      setDiagnostics((prev) => ({
        ...prev,
        lastConnectedAt: Date.now(),
        latencyHealth: "excellent",
      }));
    };

    const handleWaiting = () => {
      if (!isExplicitlyPausedRef.current) {
        setStatus("loading");
      }
    };

    const handleStalled = () => {
      if (!isExplicitlyPausedRef.current) {
        setDiagnostics((prev) => ({ ...prev, latencyHealth: "stalled" }));
      }
    };

    const handlePause = () => {
      if (isExplicitlyPausedRef.current) {
        setStatus("paused");
      }
    };

    const handleError = () => {
      if (isExplicitlyPausedRef.current) return;
      setStatus("error");
      setDiagnostics((prev) => ({ ...prev, latencyHealth: "stalled" }));
      scheduleReconnectRef.current();
    };

    audio.addEventListener("playing", handlePlaying);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("stalled", handleStalled);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("playing", handlePlaying);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("stalled", handleStalled);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("error", handleError);
      audio.pause();
      audio.src = "";
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, []);

  // Sync MediaSession for background play and OS lockscreen
  useEffect(() => {
    if (typeof window !== "undefined" && "mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: "Khulumani FM 95.0",
        artist: currentShowTitle,
        album: "Voice of the City of Kings & Queens (Bulawayo)",
        artwork: [
          {
            src: "https://www.khulumanifm.co.zw/wp-content/uploads/2021/10/cropped-favicon.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      });

      navigator.mediaSession.setActionHandler("play", () => {
        resumePlaybackRef.current();
      });
      navigator.mediaSession.setActionHandler("pause", () => {
        pausePlaybackRef.current();
      });
      navigator.mediaSession.setActionHandler("stop", () => {
        pausePlaybackRef.current();
      });
    }
  }, [currentShowTitle]);

  // Watchdog timer (runs every 3 seconds to catch the 5-minute freeze bug)
  useEffect(() => {
    const watchdogInterval = setInterval(() => {
      const audio = audioRef.current;
      if (!audio || isExplicitlyPausedRef.current) return;

      if (status === "playing") {
        const currentTime = audio.currentTime;
        const lastTime = lastRecordedTimeRef.current;

        if (isPlaybackStalled(lastTime, currentTime, true)) {
          stallCountRef.current += 1;

          // If playback hasn't moved for 2 cycles (~6 seconds), the socket died
          if (stallCountRef.current >= 2) {
            stallCountRef.current = 0;
            scheduleReconnectRef.current();
          }
        } else {
          stallCountRef.current = 0;
          lastRecordedTimeRef.current = currentTime;
        }

        // Increment stream uptime counter
        setDiagnostics((prev) => ({
          ...prev,
          totalUptimeSeconds: prev.totalUptimeSeconds + 3,
        }));
      }
    }, 3000);

    return () => clearInterval(watchdogInterval);
  }, [status]);

  const togglePlay = useCallback(() => {
    if (
      status === "playing" ||
      status === "loading" ||
      status === "reconnecting"
    ) {
      pausePlayback();
    } else {
      resumePlayback();
    }
  }, [status, pausePlayback, resumePlayback]);

  const setVolume = useCallback((val: number) => {
    const clamped = Math.max(0, Math.min(1, val));
    setVolumeState(clamped);
    setIsMuted(clamped === 0);
    if (audioRef.current) {
      audioRef.current.volume = clamped;
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (isMuted) {
      const restored = volume > 0 ? volume : 0.85;
      setIsMuted(false);
      if (audioRef.current) audioRef.current.volume = restored;
    } else {
      setIsMuted(true);
      if (audioRef.current) audioRef.current.volume = 0;
    }
  }, [isMuted, volume]);

  const forceReconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    isExplicitlyPausedRef.current = false;
    connectStreamRef.current();
  }, []);

  return {
    status,
    volume,
    isMuted,
    diagnostics,
    errorMessage,
    togglePlay,
    setVolume,
    toggleMute,
    forceReconnect,
  };
}
