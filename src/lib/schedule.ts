import type { ShowScheduleItem } from "@/types/radio";
import { KHULUMANI_SHOWS } from "./showsData";

export { KHULUMANI_SHOWS };

export const DAY_NAMES: readonly {
  readonly day: number;
  readonly label: string;
  readonly short: string;
}[] = [
  { day: 1, label: "Monday", short: "Mon" },
  { day: 2, label: "Tuesday", short: "Tue" },
  { day: 3, label: "Wednesday", short: "Wed" },
  { day: 4, label: "Thursday", short: "Thu" },
  { day: 5, label: "Friday", short: "Fri" },
  { day: 6, label: "Saturday", short: "Sat" },
  { day: 0, label: "Sunday", short: "Sun" },
];

export function getShowsForDay(dayIndex: number): ShowScheduleItem[] {
  return KHULUMANI_SHOWS.filter((s) => s.days.includes(dayIndex)).sort(
    (a, b) => a.startHour - b.startHour
  );
}

export function getShowBySlug(slug: string): ShowScheduleItem | undefined {
  return KHULUMANI_SHOWS.find((s) => s.slug === slug || s.id === slug);
}

/**
 * Converts any Date to Central Africa Time (Bulawayo, UTC+2)
 */
export function getBulawayoTime(date: Date = new Date()): {
  day: number;
  hour: number;
  minute: number;
  timeString: string;
} {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Africa/Harare",
    hour12: false,
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const parts = formatter.formatToParts(date);
  let hour = 0;
  let minute = 0;
  let weekdayStr = "";

  for (const p of parts) {
    if (p.type === "hour") {
      const parsed = parseInt(p.value, 10);
      hour = parsed === 24 ? 0 : parsed;
    }
    if (p.type === "minute") minute = parseInt(p.value, 10);
    if (p.type === "weekday") weekdayStr = p.value;
  }

  const daysMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  const day = daysMap[weekdayStr] ?? date.getUTCDay();

  const hh = String(hour).padStart(2, "0");
  const mm = String(minute).padStart(2, "0");

  return {
    day,
    hour,
    minute,
    timeString: `${hh}:${mm} CAT`,
  };
}

/**
 * Finds the currently active show based on current day and hour
 */
export function getCurrentShow(date: Date = new Date()): ShowScheduleItem {
  const { day, hour } = getBulawayoTime(date);

  const matched = KHULUMANI_SHOWS.find((show) => {
    const isToday = show.days.includes(day);
    if (!isToday) return false;
    return hour >= show.startHour && hour < show.endHour;
  });

  return (
    matched ??
    KHULUMANI_SHOWS[6] ?? {
      id: "khulumani-on-air",
      slug: "khulumani-on-air",
      title: "Khulumani FM 95.0 Live",
      presenter: "Studio On Air",
      startHour: 0,
      endHour: 24,
      timeLabel: "All Day",
      daysLabel: "Daily",
      description: "Live broadcasting from Montrose Studios, Bulawayo.",
      days: [0, 1, 2, 3, 4, 5, 6],
      genre: "Mixed Bag",
      image: "/images/show-banner.jpg",
    }
  );
}

/**
 * Calculates the next upcoming show
 */
export function getNextShow(date: Date = new Date()): ShowScheduleItem {
  const current = getCurrentShow(date);
  const { day } = getBulawayoTime(date);

  const nextHour = current.endHour >= 24 ? 0 : current.endHour;
  const targetDay = current.endHour >= 24 ? (day + 1) % 7 : day;

  const nextMatch = KHULUMANI_SHOWS.find(
    (s) => s.days.includes(targetDay) && s.startHour === nextHour
  );

  return nextMatch ?? current;
}
