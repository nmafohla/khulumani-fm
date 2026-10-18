import type { ShowScheduleItem } from "@/types/radio";

/**
 * Standard weekly programming schedule for Khulumani FM 95.0 (Bulawayo, Zimbabwe)
 * Times are based on Central Africa Time (CAT, UTC+2).
 */
export const KHULUMANI_SHOWS: readonly ShowScheduleItem[] = [
  {
    id: "vuka-bulawayo",
    title: "Vuka Bulawayo (Morning Glory)",
    presenter: "Sihle & DJ Nite",
    startHour: 6,
    endHour: 9,
    description:
      "The premier morning wake-up drive featuring regional headlines, traffic updates, motivational vibes, and energizing local afro-beats.",
    days: [1, 2, 3, 4, 5],
    genre: "Morning Drive & News",
  },
  {
    id: "chuu-midmorning",
    title: "Chuu – Mid Morning Show",
    presenter: "Khanyile & Tracy",
    startHour: 9,
    endHour: 12,
    description:
      "Bulawayo's vibrant mid-morning hub focusing on youth empowerment, community stories, lifestyle, arts, and listener call-ins.",
    days: [1, 2, 3, 4, 5],
    genre: "Lifestyle, Talk & Culture",
  },
  {
    id: "lunchtime-express",
    title: "The Lunchtime Link",
    presenter: "Babongile & Guests",
    startHour: 12,
    endHour: 15,
    description:
      "A blend of traditional and contemporary hits, business spotlights, and lunchtime discussions connecting the Matabeleland region.",
    days: [1, 2, 3, 4, 5],
    genre: "Afro-Pop & Community Link",
  },
  {
    id: "drive-time-expedition",
    title: "The Drive Time Expedition",
    presenter: "DJ Thorne & C-Sharp",
    startHour: 15,
    endHour: 18,
    description:
      "The energetic evening commute companion packed with sports rundowns, hot releases, comedy segments, and road safety updates.",
    days: [1, 2, 3, 4, 5],
    genre: "Drive Time & Sports",
  },
  {
    id: "city-of-kings-top20",
    title: "Khulumani Top 20 & Urban Jams",
    presenter: "Mzoe & Guest DJs",
    startHour: 18,
    endHour: 21,
    description:
      "Highlighting the countdown of the week's biggest tracks across Southern Africa, hip hop, amapiano, and indie Zimbabwean talents.",
    days: [1, 2, 3, 4, 5, 6],
    genre: "Music Charts & Amapiano",
  },
  {
    id: "night-shift-soul",
    title: "Soulful Evenings & Lovers Rock",
    presenter: "Nomagugu",
    startHour: 21,
    endHour: 24,
    description:
      "Wind down with smooth soul, reggae, jazz, and intimate relationship discussions as midnight approaches.",
    days: [0, 1, 2, 3, 4, 5, 6],
    genre: "Slow Jams, Soul & Jazz",
  },
  {
    id: "midnight-rendezvous",
    title: "Midnight Rendezvous (All-Night)",
    presenter: "Automated Studio DJ",
    startHour: 0,
    endHour: 6,
    description:
      "Continuous music flow through the early hours keeping night owls, shift workers, and cross-border travelers company.",
    days: [0, 1, 2, 3, 4, 5, 6],
    genre: "Non-stop Playlist",
  },
  {
    id: "weekend-breakfast",
    title: "Super Saturday / Sunday Rise",
    presenter: "Thorne & Khanyile",
    startHour: 6,
    endHour: 12,
    description:
      "Weekend lifestyle, gospel inspiration on Sunday, sports previews on Saturday, and family-friendly entertainment.",
    days: [0, 6],
    genre: "Weekend Lifestyle & Inspiration",
  },
  {
    id: "weekend-party-zone",
    title: "Weekend Ultimate Party Session",
    presenter: "Bulawayo Finest Club DJs",
    startHour: 12,
    endHour: 21,
    description:
      "The hottest club mixes, house, kwaito, dancehall, and live party shout-outs broadcasting live across the City of Kings.",
    days: [0, 6],
    genre: "Club Beats & Live Sets",
  },
];

/**
 * Converts any Date to Central Africa Time (Bulawayo, UTC+2)
 */
export function getBulawayoTime(date: Date = new Date()): {
  day: number;
  hour: number;
  minute: number;
  timeString: string;
} {
  // Use Intl.DateTimeFormat to reliably format in Africa/Harare / CAT
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
    if (p.type === "hour") hour = parseInt(p.value, 10);
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

    if (show.startHour <= show.endHour) {
      return hour >= show.startHour && hour < show.endHour;
    }
    // Overnight show wrapping around midnight
    return hour >= show.startHour || hour < show.endHour;
  });

  return (
    matched ?? {
      id: "khulumani-on-air",
      title: "Khulumani FM 95.0 Live",
      presenter: "Studio On Air",
      startHour: 0,
      endHour: 24,
      description: "Live broadcasting from Montrose Studios, Bulawayo.",
      days: [0, 1, 2, 3, 4, 5, 6],
      genre: "Broadcasting Live",
    }
  );
}

/**
 * Calculates the next upcoming show
 */
export function getNextShow(date: Date = new Date()): ShowScheduleItem {
  const current = getCurrentShow(date);
  const { day } = getBulawayoTime(date);

  // Look for next show today after current end hour
  const nextToday = KHULUMANI_SHOWS.find(
    (s) => s.days.includes(day) && s.startHour === current.endHour
  );
  if (nextToday) return nextToday;

  // Fallback to first show of the day or midnight
  const candidate = KHULUMANI_SHOWS.find(
    (s) => s.days.includes((day + 1) % 7) && s.startHour >= 6
  );
  return candidate ?? current;
}
