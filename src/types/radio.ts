export type StreamStatus =
  "idle" | "loading" | "playing" | "paused" | "reconnecting" | "error";

export interface ShowScheduleItem {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly presenter: string;
  readonly startHour: number; // 0-23 in Central Africa Time (CAT)
  readonly endHour: number; // 1-24
  readonly timeLabel: string;
  readonly daysLabel: string;
  readonly description: string;
  readonly days: readonly number[]; // 0 = Sunday, 1 = Monday, ... 6 = Saturday
  readonly genre: string;
  readonly image: string;
}

export interface TeamMember {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly role: string;
  readonly shows: readonly string[];
  readonly scheduleSummary: string;
  readonly bio: string;
  readonly image: string;
}

export interface ChartTrack {
  readonly position: number;
  readonly previousPosition: number;
  readonly title: string;
  readonly artist: string;
  readonly coverImage: string;
  readonly weeksOnChart: number;
  readonly votes: number;
}

export interface NewsArticle {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly category: string;
  readonly date: string;
  readonly excerpt: string;
  readonly content: string;
  readonly image: string;
  readonly author: string;
}

export interface StreamDiagnostics {
  readonly attempts: number;
  readonly lastConnectedAt: number | null;
  readonly totalUptimeSeconds: number;
  readonly reconnectCount: number;
  readonly bitrate: string;
  readonly codec: string;
  readonly latencyHealth: "excellent" | "good" | "stalled";
}
