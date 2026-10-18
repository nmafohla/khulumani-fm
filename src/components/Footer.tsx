import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { STATION_CONTACTS } from "@/lib/stationContent";
import {
  FacebookBrandIcon,
  InstagramBrandIcon,
  XBrandIcon,
  TikTokBrandIcon,
  WhatsAppBrandIcon,
} from "@/components/SocialBrandIcons";

export function Footer() {
  const socialButtons = [
    {
      href: STATION_CONTACTS.socials.facebook,
      label: "Facebook",
      Icon: FacebookBrandIcon,
    },
    {
      href: STATION_CONTACTS.socials.instagram,
      label: "Instagram",
      Icon: InstagramBrandIcon,
    },
    {
      href: STATION_CONTACTS.socials.x,
      label: "X (Twitter)",
      Icon: XBrandIcon,
    },
    {
      href: STATION_CONTACTS.socials.tiktok,
      label: "TikTok",
      Icon: TikTokBrandIcon,
    },
  ];

  return (
    <footer className="bg-white border-t border-khulumani-border pb-28 pt-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-khulumani-border">
          {/* Column 1: Logo & Who We Are */}
          <div className="space-y-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo.png"
              alt="Khulumani FM 95.0 - Izwi Lethu, Igugu Lethu"
              width={180}
              height={94}
              loading="lazy"
              className="h-16 w-auto object-contain"
            />
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#141414]">
              Who We Are
            </h3>
            <p className="text-sm text-khulumani-muted leading-relaxed">
              Khulumani FM is the leading community radio station for the youth
              and young at heart. The station educates, entertains and informs
              its audiences through its vibrant, exciting and music-driven
              shows.
            </p>
          </div>

          {/* Column 2: Quick Navigation */}
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#141414] mb-4">
              Station Pages
            </h3>
            <ul className="space-y-2.5 text-sm font-semibold text-khulumani-ink">
              <li>
                <Link
                  href="/"
                  className="hover:text-[#119e45] transition-colors"
                >
                  Home &amp; Live Player
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="hover:text-[#119e45] transition-colors"
                >
                  News &amp; Updates
                </Link>
              </li>
              <li>
                <Link
                  href="/shows-schedule"
                  className="hover:text-[#119e45] transition-colors"
                >
                  Shows &amp; Schedule
                </Link>
              </li>
              <li>
                <Link
                  href="/charts-elementor"
                  className="hover:text-[#119e45] transition-colors"
                >
                  Top Week Charts
                </Link>
              </li>
              <li>
                <Link
                  href="/team-members"
                  className="hover:text-[#119e45] transition-colors"
                >
                  On-Air Personalities
                </Link>
              </li>
              <li>
                <Link
                  href="/contacts"
                  className="hover:text-[#119e45] transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Listen & Contact */}
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#141414] mb-4">
              Listen &amp; Studio Lines
            </h3>
            <ul className="space-y-3 text-sm text-khulumani-muted">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#119e45] shrink-0" />
                <a
                  href="tel:+263292472730"
                  className="hover:text-[#119e45] font-medium"
                >
                  {STATION_CONTACTS.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <WhatsAppBrandIcon className="w-4 h-4 text-[#119e45] shrink-0" />
                <a
                  href={STATION_CONTACTS.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#119e45] font-medium"
                >
                  {STATION_CONTACTS.mobile} (WhatsApp)
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#119e45] shrink-0" />
                <a
                  href={`mailto:${STATION_CONTACTS.email}`}
                  className="hover:text-[#119e45] font-medium"
                >
                  {STATION_CONTACTS.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#119e45] shrink-0 mt-0.5" />
                <span>{STATION_CONTACTS.location}</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Media */}
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#141414] mb-4">
              Follow Khulumani FM 95.0
            </h3>
            <p className="text-xs text-khulumani-muted mb-4">
              Join the conversation across Bulawayo and worldwide on our
              official social channels:
            </p>
            <div className="grid grid-cols-2 gap-2.5 text-xs font-extrabold">
              {socialButtons.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] px-3 py-2.5 rounded-xl bg-khulumani-greenLight text-[#141414] hover:bg-[#119e45] hover:text-white border border-[#119e45]/20 flex items-center justify-center gap-2 shadow-sm apple-spring active:scale-[0.96] group"
                >
                  <span className="w-6 h-6 rounded-full bg-[#119e45] text-white group-hover:bg-white group-hover:text-[#119e45] flex items-center justify-center shrink-0 transition-colors">
                    <Icon className="w-3.5 h-3.5" />
                  </span>
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-khulumani-muted">
          <p>© The Zimbabwe Broadcasting Corporation. All rights reserved.</p>
          <p className="font-semibold text-[#141414]">
            Khulumani FM 95.0 — &ldquo;Izwi Lethu, Igugu Lethu&rdquo;
          </p>
        </div>
      </div>
    </footer>
  );
}
