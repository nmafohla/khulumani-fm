import { describe, it, expect } from "vitest";
import {
  getCurrentShow,
  getNextShow,
  getBulawayoTime,
  getShowsForDay,
  KHULUMANI_SHOWS,
} from "@/lib/schedule";
import {
  TEAM_MEMBERS,
  TOP_CHART_TRACKS,
  STATION_CONTACTS,
} from "@/lib/stationContent";

describe("schedule and station content utilities", () => {
  it("contains all authentic Khulumani FM shows", () => {
    expect(KHULUMANI_SHOWS.length).toBeGreaterThanOrEqual(20);
    const titles = KHULUMANI_SHOWS.map((s) => s.title);
    expect(titles.some((t) => t.includes("Jam & Toast"))).toBe(true);
    expect(titles.some((t) => t.includes("Chuu"))).toBe(true);
    expect(titles.some((t) => t.includes("Koloi Yamonate"))).toBe(true);
    expect(titles.some((t) => t.includes("Vrr-Phaa Drive Time"))).toBe(true);
    expect(titles.some((t) => t.includes("K – Lounge"))).toBe(true);
    expect(titles.some((t) => t.includes("Pyjama Party"))).toBe(true);
    expect(titles.some((t) => t.includes("Indosakusa"))).toBe(true);
    expect(titles.some((t) => t.includes("The Morning After"))).toBe(true);
  });

  it("provides full 24-hour show coverage for every day of the week (0-6)", () => {
    for (let day = 0; day <= 6; day++) {
      const shows = getShowsForDay(day);
      expect(shows.length).toBeGreaterThanOrEqual(6);
      expect(shows[0]?.startHour).toBe(0);
      expect(shows[shows.length - 1]?.endHour).toBe(24);
    }
  });

  it("calculates Bulawayo time in Central Africa Time (CAT)", () => {
    const fixed = new Date("2026-10-18T12:00:00Z"); // UTC 12:00 -> CAT is UTC+2 = 14:00
    const cat = getBulawayoTime(fixed);
    expect(cat.hour).toBe(14);
    expect(cat.timeString).toContain("14:00 CAT");
  });

  it("returns an active show and valid next show for any given date", () => {
    const show = getCurrentShow(new Date());
    expect(show.title.length).toBeGreaterThan(0);
    expect(show.presenter.length).toBeGreaterThan(0);

    const nextShow = getNextShow(new Date());
    expect(nextShow.title.length).toBeGreaterThan(0);
  });

  it("includes authentic team members, charts, and station contact details", () => {
    expect(TEAM_MEMBERS.length).toBeGreaterThanOrEqual(14);
    expect(TOP_CHART_TRACKS.length).toBe(10);
    expect(STATION_CONTACTS.email).toBe("khulumanifm@zbc.co.zw");
    expect(STATION_CONTACTS.phone).toBe("+263 292 472 730");
  });
});
