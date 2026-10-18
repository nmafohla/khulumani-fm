"use client";

import { MessageSquare, Phone, MapPin, Radio, Heart } from "lucide-react";

export function StudioConnect() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Studio Contact & WhatsApp Hotline */}
      <div className="rounded-2xl bg-station-card border border-station-border p-6 sm:p-8 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-station-gold mb-3">
            <MessageSquare className="w-4 h-4" />
            Connect With The On-Air Team
          </div>
          <h3 className="text-xl font-black text-white">
            Studio Hotline &amp; Shoutouts
          </h3>
          <p className="text-xs text-station-muted mt-2 leading-relaxed">
            Send your music requests, community announcements, and studio
            feedback directly to the presenters on duty.
          </p>

          <div className="space-y-3 mt-6">
            <a
              href="https://wa.me/263772123456?text=Hello%20Khulumani%20FM%2095.0%20Studio!%20Listening%20live%20from"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 transition-colors"
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 fill-current" />
                <div>
                  <div className="text-xs font-bold text-white">
                    WhatsApp Studio Line
                  </div>
                  <div className="text-[11px] text-emerald-300 font-mono">
                    +263 77 212 3456
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500 text-station-dark">
                Message
              </span>
            </a>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-station-dark border border-station-border/70 text-station-muted">
              <Phone className="w-5 h-5 text-station-gold" />
              <div>
                <div className="text-xs font-bold text-white">
                  Call-in Lines
                </div>
                <div className="text-[11px] font-mono text-station-muted">
                  +263 29 271 000 / 272 000
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-station-border/40 text-xs text-station-muted flex items-center justify-between">
          <span>SMS Shoutouts: 33950</span>
          <span>Bulawayo Central</span>
        </div>
      </div>

      {/* Coverage & Transmission Info */}
      <div className="rounded-2xl bg-gradient-to-br from-station-card to-station-dark border border-station-border p-6 sm:p-8 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-station-teal mb-3">
            <Radio className="w-4 h-4" />
            Frequency &amp; Transmission
          </div>
          <h3 className="text-xl font-black text-white">
            Montrose Transmission Tower
          </h3>
          <p className="text-xs text-station-muted mt-2 leading-relaxed">
            Khulumani FM operates from the Zimbabwe Broadcasting Corporation
            Montrose Studios in Bulawayo, broadcasting on FM 95.0 MHz and
            reaching listeners across Zimbabwe and the global diaspora online.
          </p>

          <div className="grid grid-cols-2 gap-3 mt-6">
            <div className="p-3 rounded-xl bg-station-dark/80 border border-station-border/60">
              <span className="text-[10px] uppercase font-bold text-station-gold block">
                Dial
              </span>
              <span className="text-sm font-black text-white">95.0 FM</span>
            </div>
            <div className="p-3 rounded-xl bg-station-dark/80 border border-station-border/60">
              <span className="text-[10px] uppercase font-bold text-station-teal block">
                Bitrate
              </span>
              <span className="text-sm font-black text-white">
                192 kbps MP3
              </span>
            </div>
            <div className="p-3 rounded-xl bg-station-dark/80 border border-station-border/60">
              <span className="text-[10px] uppercase font-bold text-station-muted block">
                Language
              </span>
              <span className="text-xs font-bold text-white">
                Ndebele, English, Shona
              </span>
            </div>
            <div className="p-3 rounded-xl bg-station-dark/80 border border-station-border/60">
              <span className="text-[10px] uppercase font-bold text-station-muted block">
                Coverage
              </span>
              <span className="text-xs font-bold text-white">
                Bulawayo &amp; Worldwide
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-station-border/40 text-xs text-station-muted flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-station-gold" />
            <span>Montrose Studios, Bulawayo</span>
          </div>
          <div className="flex items-center gap-1 text-station-gold text-xs">
            <span>Powered by Hakili</span>
            <Heart className="w-3 h-3 fill-current text-station-red" />
          </div>
        </div>
      </div>
    </div>
  );
}
