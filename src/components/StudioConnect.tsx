"use client";

import Link from "next/link";
import {
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Radio,
  ArrowRight,
} from "lucide-react";
import { STATION_CONTACTS } from "@/lib/stationContent";

export function StudioConnect() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Studio Contact & WhatsApp Hotline */}
      <div className="rounded-3xl bg-white border border-khulumani-border p-6 sm:p-8 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-khulumani-green mb-2">
            <MessageSquare className="w-4 h-4" />
            Connect With Montrose Studios
          </div>
          <h3 className="text-2xl font-black text-khulumani-ink">
            Studio Hotline &amp; Dedications
          </h3>
          <p className="text-sm text-khulumani-muted mt-2 leading-relaxed">
            Send your song requests, birthday shoutouts, and community notices
            directly to the presenters on air.
          </p>

          <div className="space-y-3 mt-6">
            <a
              href={STATION_CONTACTS.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-2xl bg-khulumani-greenLight hover:bg-khulumani-green border border-khulumani-green/30 text-khulumani-greenDark hover:text-white transition-all group"
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-khulumani-green group-hover:text-white" />
                <div>
                  <div className="text-xs font-extrabold">
                    WhatsApp &amp; Studio Mobile
                  </div>
                  <div className="text-sm font-mono font-bold">
                    {STATION_CONTACTS.mobile}
                  </div>
                </div>
              </div>
              <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-khulumani-green text-white group-hover:bg-white group-hover:text-khulumani-greenDark">
                Chat Now
              </span>
            </a>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="tel:+263292472730"
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-khulumani-bg border border-khulumani-border hover:border-khulumani-green transition-colors"
              >
                <Phone className="w-4 h-4 text-khulumani-green shrink-0" />
                <div>
                  <div className="text-[11px] font-bold text-khulumani-muted">
                    Direct Studio Line
                  </div>
                  <div className="text-xs font-mono font-extrabold text-khulumani-ink">
                    {STATION_CONTACTS.phone}
                  </div>
                </div>
              </a>

              <a
                href={`mailto:${STATION_CONTACTS.email}`}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-khulumani-bg border border-khulumani-border hover:border-khulumani-green transition-colors"
              >
                <Mail className="w-4 h-4 text-khulumani-green shrink-0" />
                <div className="min-w-0">
                  <div className="text-[11px] font-bold text-khulumani-muted">
                    Official Email
                  </div>
                  <div className="text-xs font-extrabold text-khulumani-ink truncate">
                    {STATION_CONTACTS.email}
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-khulumani-border flex items-center justify-between text-xs font-bold">
          <span className="text-khulumani-muted">
            Want to send a message online?
          </span>
          <Link
            href="/contacts"
            className="inline-flex items-center gap-1 text-khulumani-green hover:text-khulumani-greenDark font-extrabold"
          >
            <span>Open Contact Form</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Who We Are & Transmission Info */}
      <div className="rounded-3xl bg-white border border-khulumani-border p-6 sm:p-8 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-khulumani-teal mb-2">
            <Radio className="w-4 h-4 text-khulumani-green" />
            Izwi Lethu, Igugu Lethu
          </div>
          <h3 className="text-2xl font-black text-khulumani-ink">
            About Khulumani FM 95.0
          </h3>
          <p className="text-sm text-khulumani-muted mt-2 leading-relaxed">
            Khulumani FM is the leading community radio station for the youth
            and young at heart. Broadcasting from Montrose Studios in Bulawayo
            under the Zimbabwe Broadcasting Corporation, the station educates,
            entertains, and informs audiences through vibrant, music-driven
            shows.
          </p>

          <div className="grid grid-cols-2 gap-3 mt-6">
            <div className="p-3.5 rounded-2xl bg-khulumani-greenLight/60 border border-khulumani-border">
              <span className="text-[10px] uppercase font-extrabold text-khulumani-greenDark block">
                FM Frequency
              </span>
              <span className="text-base font-black text-khulumani-ink">
                95.0 MHz
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-khulumani-greenLight/60 border border-khulumani-border">
              <span className="text-[10px] uppercase font-extrabold text-khulumani-greenDark block">
                Digital Stream
              </span>
              <span className="text-base font-black text-khulumani-ink">
                192 kbps MP3
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-khulumani-greenLight/60 border border-khulumani-border">
              <span className="text-[10px] uppercase font-extrabold text-khulumani-greenDark block">
                Languages
              </span>
              <span className="text-xs font-bold text-khulumani-ink">
                Ndebele, English, Kalanga, Tonga, Venda, Sotho
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-khulumani-greenLight/60 border border-khulumani-border">
              <span className="text-[10px] uppercase font-extrabold text-khulumani-greenDark block">
                Studios
              </span>
              <span className="text-xs font-bold text-khulumani-ink">
                Montrose, Bulawayo
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-khulumani-border text-xs text-khulumani-muted flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 font-semibold">
            <MapPin className="w-3.5 h-3.5 text-khulumani-green" />
            {STATION_CONTACTS.location}
          </span>
          <span className="font-extrabold text-khulumani-greenDark">
            ZBC Community Radio
          </span>
        </div>
      </div>
    </div>
  );
}
