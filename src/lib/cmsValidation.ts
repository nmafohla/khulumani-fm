import { z } from "zod";
import type { SiteContentPayload } from "@/types/radio";

export const loginRequestSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export const showScheduleItemSchema = z.object({
  id: z.string().trim().min(1),
  slug: z.string().trim().min(1),
  title: z.string().trim().min(1),
  presenter: z.string().trim().min(1),
  startHour: z.number().int().min(0).max(23),
  endHour: z.number().int().min(1).max(24),
  timeLabel: z.string().trim().min(1),
  daysLabel: z.string().trim().min(1),
  description: z.string().trim().min(1),
  days: z.array(z.number().int().min(0).max(6)).min(1),
  genre: z.string().trim().min(1),
  image: z.string().trim().min(1),
});

export const chartTrackSchema = z.object({
  position: z.number().int().min(1).max(100),
  previousPosition: z.number().int().min(1).max(100),
  title: z.string().trim().min(1),
  artist: z.string().trim().min(1),
  coverImage: z.string().trim().min(1),
  weeksOnChart: z.number().int().min(1),
  votes: z.number().int().min(0),
});

export const teamMemberSchema = z.object({
  id: z.string().trim().min(1),
  slug: z.string().trim().min(1),
  name: z.string().trim().min(1),
  role: z.string().trim().min(1),
  shows: z.array(z.string().trim().min(1)),
  scheduleSummary: z.string().trim().min(1),
  bio: z.string().trim().min(1),
  image: z.string().trim().min(1),
});

export const newsArticleSchema = z.object({
  id: z.string().trim().min(1),
  slug: z.string().trim().min(1),
  title: z.string().trim().min(1),
  category: z.string().trim().min(1),
  date: z.string().trim().min(1),
  excerpt: z.string().trim().min(1),
  content: z.string().trim().min(1),
  image: z.string().trim().min(1),
  author: z.string().trim().min(1),
});

export const stationHeroContentSchema = z.object({
  badge: z.string().trim().min(1),
  headline: z.string().trim().min(1),
  subtitle: z.string().trim().min(1),
  announcement: z.string().trim().min(1),
});

export const stationContactsContentSchema = z.object({
  name: z.string().trim().min(1),
  slogan: z.string().trim().min(1),
  parentOrg: z.string().trim().min(1),
  phone: z.string().trim().min(1),
  mobile: z.string().trim().min(1),
  whatsappUrl: z.string().trim().min(1),
  email: z.string().trim().email(),
  location: z.string().trim().min(1),
  frequency: z.string().trim().min(1),
  heroTitle: z.string().trim().min(1),
  heroSubtitle: z.string().trim().min(1),
  socials: z.object({
    facebook: z.string().trim().min(1),
    instagram: z.string().trim().min(1),
    x: z.string().trim().min(1),
    tiktok: z.string().trim().min(1),
  }),
});

export const siteContentPayloadSchema: z.ZodType<SiteContentPayload> = z.object(
  {
    hero: stationHeroContentSchema,
    contacts: stationContactsContentSchema,
    shows: z.array(showScheduleItemSchema).min(1),
    charts: z.array(chartTrackSchema).min(1),
    team: z.array(teamMemberSchema).min(1),
    news: z.array(newsArticleSchema).min(1),
  }
);
