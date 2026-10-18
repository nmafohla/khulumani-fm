"use client";

import type { StationContactsContent, StationHeroContent } from "@/types/radio";

export const AVAILABLE_STUDIO_IMAGES = [
  { label: "Cde Phil Studio Poster", value: "/images/cde-phil.jpg" },
  { label: "Morning After Host Poster", value: "/images/studio-host-1.png" },
  { label: "Montrose Live Roundtable", value: "/images/post-1.jpg" },
  { label: "Master Mixing Console", value: "/images/post-2.jpg" },
  { label: "Live Studio Session", value: "/images/post-3.jpg" },
  { label: "On Air Studio Microphone", value: "/images/show-banner.jpg" },
  { label: "Team Percussion Banner", value: "/images/team-banner.jpg" },
  { label: "Live Concert Crowd Banner", value: "/images/events-bg.jpg" },
  { label: "Chart Cover #1", value: "/images/track-1.jpg" },
  { label: "Chart Cover #2", value: "/images/track-2.jpg" },
  { label: "Chart Cover #3", value: "/images/track-3.jpg" },
  { label: "Chart Feature #1", value: "/images/chart-1.jpg" },
  { label: "Chart Feature #2", value: "/images/chart-2.jpg" },
  { label: "Chart Feature #3", value: "/images/chart-3.jpg" },
] as const;

export function HeroSectionEditor({
  hero,
  onChange,
}: {
  readonly hero: StationHeroContent;
  readonly onChange: (next: StationHeroContent) => void;
}) {
  return (
    <fieldset className="space-y-4">
      <legend className="text-lg font-black text-khulumani-ink mb-2">
        Homepage Hero &amp; Broadcast Notice
      </legend>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="hero-badge"
            className="block text-xs font-extrabold uppercase tracking-wider text-khulumani-ink mb-1"
          >
            Top Badge Text
          </label>
          <input
            id="hero-badge"
            name="heroBadge"
            type="text"
            value={hero.badge}
            onChange={(e) => onChange({ ...hero, badge: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-khulumani-bg border border-khulumani-border text-sm text-khulumani-ink"
          />
        </div>

        <div>
          <label
            htmlFor="hero-headline"
            className="block text-xs font-extrabold uppercase tracking-wider text-khulumani-ink mb-1"
          >
            Main Station Headline
          </label>
          <input
            id="hero-headline"
            name="heroHeadline"
            type="text"
            value={hero.headline}
            onChange={(e) => onChange({ ...hero, headline: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-khulumani-bg border border-khulumani-border text-sm text-khulumani-ink"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="hero-subtitle"
          className="block text-xs font-extrabold uppercase tracking-wider text-khulumani-ink mb-1"
        >
          Hero Subtitle Description
        </label>
        <textarea
          id="hero-subtitle"
          name="heroSubtitle"
          rows={2}
          value={hero.subtitle}
          onChange={(e) => onChange({ ...hero, subtitle: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl bg-khulumani-bg border border-khulumani-border text-sm text-khulumani-ink"
        />
      </div>

      <div>
        <label
          htmlFor="hero-announcement"
          className="block text-xs font-extrabold uppercase tracking-wider text-khulumani-ink mb-1"
        >
          Live Studio Callout / Announcement Box
        </label>
        <textarea
          id="hero-announcement"
          name="heroAnnouncement"
          rows={2}
          value={hero.announcement}
          onChange={(e) => onChange({ ...hero, announcement: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl bg-khulumani-bg border border-khulumani-border text-sm text-khulumani-ink"
        />
      </div>
    </fieldset>
  );
}

export function ContactsSectionEditor({
  contacts,
  onChange,
}: {
  readonly contacts: StationContactsContent;
  readonly onChange: (next: StationContactsContent) => void;
}) {
  return (
    <fieldset className="space-y-4">
      <legend className="text-lg font-black text-khulumani-ink mb-2">
        Contacts Tab, Studio Hotlines &amp; Socials
      </legend>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="contacts-hero-title"
            className="block text-xs font-extrabold uppercase tracking-wider text-khulumani-ink mb-1"
          >
            Contacts Page Hero Title
          </label>
          <input
            id="contacts-hero-title"
            name="contactsHeroTitle"
            type="text"
            value={contacts.heroTitle}
            onChange={(e) =>
              onChange({ ...contacts, heroTitle: e.target.value })
            }
            className="w-full px-3.5 py-2.5 rounded-xl bg-khulumani-bg border border-khulumani-border text-sm text-khulumani-ink"
          />
        </div>

        <div>
          <label
            htmlFor="contacts-slogan"
            className="block text-xs font-extrabold uppercase tracking-wider text-khulumani-ink mb-1"
          >
            Station Slogan
          </label>
          <input
            id="contacts-slogan"
            name="contactsSlogan"
            type="text"
            value={contacts.slogan}
            onChange={(e) => onChange({ ...contacts, slogan: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-khulumani-bg border border-khulumani-border text-sm text-khulumani-ink"
          />
        </div>

        <div>
          <label
            htmlFor="contacts-phone"
            className="block text-xs font-extrabold uppercase tracking-wider text-khulumani-ink mb-1"
          >
            Studio Desk Landline
          </label>
          <input
            id="contacts-phone"
            name="contactsPhone"
            type="tel"
            value={contacts.phone}
            onChange={(e) => onChange({ ...contacts, phone: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-khulumani-bg border border-khulumani-border text-sm text-khulumani-ink"
          />
        </div>

        <div>
          <label
            htmlFor="contacts-mobile"
            className="block text-xs font-extrabold uppercase tracking-wider text-khulumani-ink mb-1"
          >
            WhatsApp &amp; Studio Mobile
          </label>
          <input
            id="contacts-mobile"
            name="contactsMobile"
            type="tel"
            value={contacts.mobile}
            onChange={(e) => onChange({ ...contacts, mobile: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-khulumani-bg border border-khulumani-border text-sm text-khulumani-ink"
          />
        </div>

        <div>
          <label
            htmlFor="contacts-email"
            className="block text-xs font-extrabold uppercase tracking-wider text-khulumani-ink mb-1"
          >
            Official Studio Email
          </label>
          <input
            id="contacts-email"
            name="contactsEmail"
            type="email"
            value={contacts.email}
            onChange={(e) => onChange({ ...contacts, email: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-khulumani-bg border border-khulumani-border text-sm text-khulumani-ink"
          />
        </div>

        <div>
          <label
            htmlFor="contacts-location"
            className="block text-xs font-extrabold uppercase tracking-wider text-khulumani-ink mb-1"
          >
            Physical Studio Address
          </label>
          <input
            id="contacts-location"
            name="contactsLocation"
            type="text"
            value={contacts.location}
            onChange={(e) =>
              onChange({ ...contacts, location: e.target.value })
            }
            className="w-full px-3.5 py-2.5 rounded-xl bg-khulumani-bg border border-khulumani-border text-sm text-khulumani-ink"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="contacts-hero-subtitle"
          className="block text-xs font-extrabold uppercase tracking-wider text-khulumani-ink mb-1"
        >
          Contacts Page Hero Subtitle
        </label>
        <textarea
          id="contacts-hero-subtitle"
          name="contactsHeroSubtitle"
          rows={2}
          value={contacts.heroSubtitle}
          onChange={(e) =>
            onChange({ ...contacts, heroSubtitle: e.target.value })
          }
          className="w-full px-3.5 py-2.5 rounded-xl bg-khulumani-bg border border-khulumani-border text-sm text-khulumani-ink"
        />
      </div>
    </fieldset>
  );
}
