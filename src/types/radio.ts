export type StreamStatus =
  "idle" | "loading" | "playing" | "paused" | "reconnecting" | "error";

export interface ShowScheduleItem {
  readonly id: string;
  readonly title: string;
  readonly presenter: string;
  readonly startHour: number; // 0-23 in Central Africa Time (CAT)
  readonly endHour: number; // 0-24
  readonly description: string;
  readonly days: readonly number[]; // 0 = Sunday, 1 = Monday, ... 6 = Saturday
  readonly genre: string;
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
