"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clock, Phone, Play, Pause, Menu, X, Radio } from "lucide-react";
import { getBulawayoTime } from "@/lib/schedule";
import { useRadio } from "@/context/RadioPlayerContext";
import { STATION_CONTACTS } from "@/lib/stationContent";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/news", label: "News" },
  { href: "/shows-schedule", label: "Schedule" },
  { href: "/charts-elementor", label: "Charts" },
  { href: "/team-members", label: "Personalities" },
  { href: "/contacts", label: "Contacts" },
] as const;

export function Header() {
  const pathname = usePathname();
  const { status, togglePlay, currentShow } = useRadio();
  const isPlaying = status === "playing";
  const [timeString, setTimeString] = useState<string>("Loading CAT...");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const { timeString: str } = getBulawayoTime();
      setTimeString(str);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-50 shadow-sm">
      {/* Top Broadcast Strip */}
      <div className="bg-gradient-to-r from-khulumani-greenDark via-khulumani-green to-khulumani-teal text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-5">
            <span className="inline-flex items-center gap-1.5 font-bold tracking-wide">
              <Radio className="w-3.5 h-3.5 text-amber-300" />
              <span>95.0 FM BULAWAYO</span>
            </span>
            <span className="hidden md:inline text-white/85 italic font-medium">
              &ldquo;{STATION_CONTACTS.slogan}&rdquo;
            </span>
            <span className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/20 text-white/95 font-medium">
              On Air:{" "}
              <strong className="text-amber-200">{currentShow.title}</strong> (
              {currentShow.presenter})
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${STATION_CONTACTS.phone.replace(/\s+/g, "")}`}
              className="hidden sm:inline-flex items-center gap-1 text-white/90 hover:text-white font-medium"
            >
              <Phone className="w-3 h-3" />
              <span>{STATION_CONTACTS.phone}</span>
            </a>
            <div className="flex items-center gap-1.5 font-mono font-semibold bg-black/20 px-2.5 py-0.5 rounded">
              <Clock className="w-3 h-3 text-amber-300" />
              <span>{timeString}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main White Navigation Bar with Original Logo */}
      <div className="bg-white/95 backdrop-blur-md border-b border-khulumani-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Original Khulumani FM Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo.png"
              alt="Khulumani FM 95.0 - Izwi Lethu, Igugu Lethu"
              width={154}
              height={80}
              className="h-14 sm:h-16 w-auto object-contain transition-transform group-hover:scale-[1.02]"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-1 lg:gap-2"
            aria-label="Main Navigation"
          >
            {NAV_ITEMS.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all ${
                    active
                      ? "bg-khulumani-green text-white shadow-sm shadow-khulumani-green/25"
                      : "text-khulumani-ink hover:bg-khulumani-greenLight hover:text-khulumani-greenDark"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Live Stream Quick Button & Mobile Menu Trigger */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={togglePlay}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all shadow-md active:scale-95 ${
                isPlaying
                  ? "bg-khulumani-tangelo text-white shadow-khulumani-tangelo/25"
                  : "bg-khulumani-green hover:bg-khulumani-greenDark text-white shadow-khulumani-green/25"
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span>ON AIR • PAUSE</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>LISTEN LIVE</span>
                </>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-2.5 rounded-xl border border-khulumani-border text-khulumani-ink hover:bg-khulumani-greenLight"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <nav
            className="md:hidden border-t border-khulumani-border bg-white px-4 py-3 space-y-1"
            aria-label="Mobile Navigation"
          >
            {NAV_ITEMS.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-bold ${
                    active
                      ? "bg-khulumani-green text-white"
                      : "text-khulumani-ink hover:bg-khulumani-greenLight"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}
