import Link from "next/link";
import { Phone, Mail, MapPin, MessageSquare } from "lucide-react";
import { STATION_CONTACTS } from "@/lib/stationContent";

export function Footer() {
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
              className="h-16 w-auto object-contain"
            />
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-khulumani-greenDark">
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
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-khulumani-greenDark mb-4">
              Station Pages
            </h3>
            <ul className="space-y-2.5 text-sm font-semibold text-khulumani-ink">
              <li>
                <Link
                  href="/"
                  className="hover:text-khulumani-green transition-colors"
                >
                  Home &amp; Live Player
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="hover:text-khulumani-green transition-colors"
                >
                  News &amp; Updates
                </Link>
              </li>
              <li>
                <Link
                  href="/shows-schedule"
                  className="hover:text-khulumani-green transition-colors"
                >
                  Shows &amp; Schedule
                </Link>
              </li>
              <li>
                <Link
                  href="/charts-elementor"
                  className="hover:text-khulumani-green transition-colors"
                >
                  Top Week Charts
                </Link>
              </li>
              <li>
                <Link
                  href="/team-members"
                  className="hover:text-khulumani-green transition-colors"
                >
                  On-Air Personalities
                </Link>
              </li>
              <li>
                <Link
                  href="/contacts"
                  className="hover:text-khulumani-green transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Listen & Contact */}
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-khulumani-greenDark mb-4">
              Listen &amp; Studio Lines
            </h3>
            <ul className="space-y-3 text-sm text-khulumani-muted">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-khulumani-green shrink-0" />
                <a
                  href="tel:+263292472730"
                  className="hover:text-khulumani-green font-medium"
                >
                  {STATION_CONTACTS.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-khulumani-green shrink-0" />
                <a
                  href={STATION_CONTACTS.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-khulumani-green font-medium"
                >
                  {STATION_CONTACTS.mobile} (WhatsApp)
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-khulumani-green shrink-0" />
                <a
                  href={`mailto:${STATION_CONTACTS.email}`}
                  className="hover:text-khulumani-green font-medium"
                >
                  {STATION_CONTACTS.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-khulumani-green shrink-0 mt-0.5" />
                <span>{STATION_CONTACTS.location}</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Media */}
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-khulumani-greenDark mb-4">
              Follow Khulumani FM 95.0
            </h3>
            <p className="text-xs text-khulumani-muted mb-4">
              Join the conversation across Bulawayo and worldwide on our
              official social channels:
            </p>
            <div className="grid grid-cols-2 gap-2.5 text-xs font-bold">
              <a
                href={STATION_CONTACTS.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2.5 rounded-xl bg-khulumani-greenLight text-khulumani-greenDark hover:bg-khulumani-green hover:text-white transition-colors text-center"
              >
                Facebook
              </a>
              <a
                href={STATION_CONTACTS.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2.5 rounded-xl bg-khulumani-greenLight text-khulumani-greenDark hover:bg-khulumani-green hover:text-white transition-colors text-center"
              >
                Instagram
              </a>
              <a
                href={STATION_CONTACTS.socials.x}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2.5 rounded-xl bg-khulumani-greenLight text-khulumani-greenDark hover:bg-khulumani-green hover:text-white transition-colors text-center"
              >
                X (Twitter)
              </a>
              <a
                href={STATION_CONTACTS.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2.5 rounded-xl bg-khulumani-greenLight text-khulumani-greenDark hover:bg-khulumani-green hover:text-white transition-colors text-center"
              >
                TikTok
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-khulumani-muted">
          <p>© The Zimbabwe Broadcasting Corporation. All rights reserved.</p>
          <p className="font-semibold text-khulumani-greenDark">
            Khulumani FM 95.0 — &ldquo;Izwi Lethu, Igugu Lethu&rdquo;
          </p>
        </div>
      </div>
    </footer>
  );
}
