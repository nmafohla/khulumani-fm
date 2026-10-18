import { describe, it, expect } from "vitest";
import {
  getStreamUrlWithCacheBust,
  calculateBackoffDelay,
  isPlaybackStalled,
  formatUptime,
} from "@/lib/audioEngine";

describe("audioEngine utilities", () => {
  it("appends cache-busting timestamp parameter to URL", () => {
    const base = "https://khulumanistream.zbc.co.zw:8000/radio.mp3";
    const result = getStreamUrlWithCacheBust(base, 1729250000000);
    expect(result).toContain("_kfm=1729250000000");
    expect(
      result.startsWith("https://khulumanistream.zbc.co.zw:8000/radio.mp3?")
    ).toBe(true);
  });

  it("calculates exponential backoff within bounds", () => {
    const delay1 = calculateBackoffDelay(1, 1000, 10000);
    expect(delay1).toBeGreaterThanOrEqual(1000);
    expect(delay1).toBeLessThanOrEqual(2000);

    const delay5 = calculateBackoffDelay(5, 1000, 5000);
    expect(delay5).toBeLessThanOrEqual(5500);
  });

  it("detects playback stall when currentTime fails to progress during play", () => {
    // If playing and time hasn't changed (within 0.05s)
    expect(isPlaybackStalled(120.4, 120.4, true)).toBe(true);
    expect(isPlaybackStalled(120.4, 120.41, true)).toBe(true);

    // If playing and time advanced
    expect(isPlaybackStalled(120.4, 122.5, true)).toBe(false);

    // If paused, not considered a stall
    expect(isPlaybackStalled(120.4, 120.4, false)).toBe(false);
  });

  it("formats uptime seconds accurately", () => {
    expect(formatUptime(0)).toBe("00:00");
    expect(formatUptime(45)).toBe("00:45");
    expect(formatUptime(125)).toBe("02:05");
    expect(formatUptime(3665)).toBe("01:01:05");
  });
});
