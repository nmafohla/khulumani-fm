/**
 * Pure helper functions for resilient streaming and watchdog monitoring.
 */

export const DEFAULT_STREAM_URL =
  process.env.NEXT_PUBLIC_STREAM_URL ??
  "https://khulumanistream.zbc.co.zw:8000/radio.mp3";

/**
 * Appends a timestamp cache-buster to prevent intermediate proxies/Cloudflare
 * or browser cache from serving stale, disconnected chunks after a drop.
 */
export function getStreamUrlWithCacheBust(
  baseUrl: string,
  timestamp: number = Date.now()
): string {
  try {
    const url = new URL(baseUrl);
    url.searchParams.set("_kfm", String(timestamp));
    return url.toString();
  } catch {
    const separator = baseUrl.includes("?") ? "&" : "?";
    return `${baseUrl}${separator}_kfm=${timestamp}`;
  }
}

/**
 * Exponential backoff with jitter for reconnecting without hammering the stream server.
 */
export function calculateBackoffDelay(
  attempt: number,
  baseMs = 1500,
  maxMs = 12000
): number {
  if (attempt <= 0) return baseMs;
  const exponential = Math.min(maxMs, baseMs * Math.pow(1.8, attempt - 1));
  const jitter = Math.random() * 500;
  return Math.floor(exponential + jitter);
}

/**
 * Determines whether playback has frozen/stalled despite being in a playing state.
 * If currentTime does not advance while playing, the stream socket is dead.
 */
export function isPlaybackStalled(
  lastRecordedTime: number,
  currentTime: number,
  isPlaying: boolean,
  epsilon = 0.05
): boolean {
  if (!isPlaying) return false;
  // If currentTime is NaN or equal to last recorded time within epsilon, it stalled
  return Math.abs(currentTime - lastRecordedTime) < epsilon;
}

/**
 * Formats uptime seconds into clean HH:MM:SS or MM:SS string
 */
export function formatUptime(totalSeconds: number): string {
  if (totalSeconds < 0 || !Number.isFinite(totalSeconds)) return "00:00";
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");

  if (hours > 0) {
    const hh = String(hours).padStart(2, "0");
    return `${hh}:${mm}:${ss}`;
  }

  return `${mm}:${ss}`;
}
