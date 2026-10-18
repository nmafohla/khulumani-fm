import { z } from "zod";
import type { SiteContentPayload } from "@/types/radio";

const safeHttpsUrlSchema = z
  .string()
  .trim()
  .url("Must be a valid URL.")
  .refine((url) => /^https:\/\//i.test(url), {
    message: "URL must use secure https:// protocol.",
  });

export const loginRequestSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(120),
  password: z.string().min(6).max(128),
});

export const showScheduleItemSchema = z.object({
  id: z.string().trim().min(1).max(64),
  slug: z.string().trim().min(1).max(64),
  title: z.string().trim().min(1).max(120),
  presenter: z.string().trim().min(1).max(120),
  startHour: z.number().int().min(0).max(23),
  endHour: z.number().int().min(1).max(24),
  timeLabel: z.string().trim().min(1).max(60),
  daysLabel: z.string().trim().min(1).max(60),
  description: z.string().trim().min(1).max(2000),
  days: z.array(z.number().int().min(0).max(6)).min(1).max(7),
  genre: z.string().trim().min(1).max(60),
  image: z.string().trim().min(1).max(500),
});

export const chartTrackSchema = z.object({
  position: z.number().int().min(1).max(100),
  previousPosition: z.number().int().min(1).max(100),
  title: z.string().trim().min(1).max(120),
  artist: z.string().trim().min(1).max(120),
  coverImage: z.string().trim().min(1).max(500),
  weeksOnChart: z.number().int().min(1).max(1000),
  votes: z.number().int().min(0).max(10_000_000),
});

export const teamMemberSchema = z.object({
  id: z.string().trim().min(1).max(64),
  slug: z.string().trim().min(1).max(64),
  name: z.string().trim().min(1).max(120),
  role: z.string().trim().min(1).max(120),
  shows: z.array(z.string().trim().min(1).max(120)).max(20),
  scheduleSummary: z.string().trim().min(1).max(200),
  bio: z.string().trim().min(1).max(4000),
  image: z.string().trim().min(1).max(500),
});

export const newsArticleSchema = z.object({
  id: z.string().trim().min(1).max(64),
  slug: z.string().trim().min(1).max(64),
  title: z.string().trim().min(1).max(200),
  category: z.string().trim().min(1).max(60),
  date: z.string().trim().min(1).max(60),
  excerpt: z.string().trim().min(1).max(1000),
  content: z.string().trim().min(1).max(20_000),
  image: z.string().trim().min(1).max(500),
  author: z.string().trim().min(1).max(120),
});

export const stationHeroContentSchema = z.object({
  badge: z.string().trim().min(1).max(80),
  headline: z.string().trim().min(1).max(150),
  subtitle: z.string().trim().min(1).max(500),
  announcement: z.string().trim().min(1).max(500),
});

export const stationContactsContentSchema = z.object({
  name: z.string().trim().min(1).max(100),
  slogan: z.string().trim().min(1).max(150),
  parentOrg: z.string().trim().min(1).max(150),
  phone: z.string().trim().min(1).max(40),
  mobile: z.string().trim().min(1).max(40),
  whatsappUrl: safeHttpsUrlSchema,
  email: z.string().trim().email().max(120),
  location: z.string().trim().min(1).max(250),
  frequency: z.string().trim().min(1).max(40),
  heroTitle: z.string().trim().min(1).max(150),
  heroSubtitle: z.string().trim().min(1).max(500),
  socials: z.object({
    facebook: safeHttpsUrlSchema,
    instagram: safeHttpsUrlSchema,
    x: safeHttpsUrlSchema,
    tiktok: safeHttpsUrlSchema,
  }),
});

export const siteContentPayloadSchema: z.ZodType<SiteContentPayload> = z.object(
  {
    hero: stationHeroContentSchema,
    contacts: stationContactsContentSchema,
    shows: z.array(showScheduleItemSchema).min(1).max(200),
    charts: z.array(chartTrackSchema).min(1).max(100),
    team: z.array(teamMemberSchema).min(1).max(100),
    news: z.array(newsArticleSchema).min(1).max(200),
  }
);
