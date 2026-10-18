import { describe, it, expect } from "vitest";
import {
  getCurrentShow,
  getNextShow,
  getBulawayoTime,
  KHULUMANI_SHOWS,
} from "@/lib/schedule";

describe("schedule utilities", () => {
  it("contains all flagship shows", () => {
    expect(KHULUMANI_SHOWS.length).toBeGreaterThanOrEqual(7);
    const titles = KHULUMANI_SHOWS.map((s) => s.title);
    expect(titles.some((t) => t.includes("Vuka Bulawayo"))).toBe(true);
    expect(titles.some((t) => t.includes("Chuu"))).toBe(true);
  });

  it("calculates Bulawayo time in Central Africa Time (CAT)", () => {
    const fixed = new Date("2026-10-18T12:00:00Z"); // UTC 12:00 -> CAT is UTC+2 = 14:00
    const cat = getBulawayoTime(fixed);
    expect(cat.hour).toBe(14);
    expect(cat.timeString).toContain("14:00 CAT");
  });

  it("returns an active show for any given date", () => {
    const show = getCurrentShow(new Date());
    expect(show).toBeDefined();
    expect(show.title.length).toBeGreaterThan(0);
    expect(show.presenter.length).toBeGreaterThan(0);
  });

  it("returns a valid next show", () => {
    const nextShow = getNextShow(new Date());
    expect(nextShow).toBeDefined();
    expect(nextShow.title.length).toBeGreaterThan(0);
  });
});
