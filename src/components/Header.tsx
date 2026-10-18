"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Clock,
  Phone,
  Play,
  Pause,
  Menu,
  X,
  Volume2,
  ShieldCheck,
} from "lucide-react";
import { getBulawayoTime } from "@/lib/schedule";
import { useRadio } from "@/context/RadioPlayerContext";
import { useSiteContent } from "@/context/SiteContentContext";

const NAV_ITEMS = [
  { href: "/", label: "HOME" },
  { href: "/news", label: "NEWS" },
  { href: "/shows-schedule", label: "SHOWS SCHEDULE" },
  { href: "/charts-elementor", label: "CHARTS" },
  { href: "/team-members", label: "PERSONALITIES" },
  { href: "/contacts", label: "CONTACTS" },
] as const;

export function Header() {
  const pathname = usePathname();
  const { status, togglePlay, currentShow } = useRadio();
  const { activeContent, sessionUser } = useSiteContent();
  const contacts = activeContent.contacts;
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
    <header className="sticky top-0 z-50 shadow-md bg-white">
      {/* Original Khulumani FM Top DEDICATIONS Ticker Strip */}
      <div className="bg-white border-b border-khulumani-border text-xs">
        <div className="max-w-7xl mx-auto pr-4 sm:pr-6 lg:pr-8 h-10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="bg-[#119e45] text-white font-black uppercase tracking-wider pl-4 pr-7 py-2.5 clip-dedications-ribbon inline-flex items-center gap-2 shrink-0">
              <Volume2 className="w-3.5 h-3.5" />
              <span>DEDICATIONS</span>
            </div>
            <p className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-khulumani-muted truncate">
              CURRENTLY THERE ARE NO NEW DEDICATIONS • ON AIR:{" "}
              <span className="text-[#141414]">
                {currentShow.title} ({currentShow.presenter})
              </span>
            </p>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
            <a
              href={`tel:${contacts.phone.replace(/\s+/g, "")}`}
              className="hidden lg:inline-flex items-center gap-1 text-[#141414] hover:text-[#119e45] font-bold"
            >
              <Phone className="w-3.5 h-3.5 text-[#119e45]" />
              <span>{contacts.phone}</span>
            </a>
            <div className="hidden sm:flex items-center gap-1.5 font-mono font-bold bg-khulumani-greenLight text-khulumani-greenDark px-2.5 py-1 rounded">
              <Clock className="w-3.5 h-3.5 text-[#119e45]" />
              <span>{timeString}</span>
            </div>
            <Link
              href="/crm"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#141414] hover:bg-[#119e45] text-white font-extrabold transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#4ade80]" />
              <span>{sessionUser ? "CRM Studio" : "CRM Login"}</span>
            </Link>
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
            className="hidden md:flex items-center gap-1 lg:gap-3 h-full"
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
                  className={`px-3 h-full inline-flex items-center text-xs lg:text-sm font-black tracking-wider border-b-4 transition-all ${
                    active
                      ? "border-[#119e45] text-[#119e45]"
                      : "border-transparent text-[#141414] hover:text-[#119e45] hover:border-[#119e45]/40"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Social Links & Live Stream Quick Button */}
          <div className="flex items-center gap-2">
            <div className="hidden xl:flex items-center gap-1.5 mr-1">
              <a
                href={contacts.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Khulumani FM Facebook"
                className="w-9 h-9 rounded-full bg-[#119e45] hover:bg-[#141414] text-white flex items-center justify-center text-xs font-black transition-colors"
              >
                f
              </a>
              <a
                href={contacts.socials.x}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Khulumani FM X"
                className="w-9 h-9 rounded-full bg-[#119e45] hover:bg-[#141414] text-white flex items-center justify-center text-xs font-black transition-colors"
              >
                𝕏
              </a>
              <a
                href={contacts.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Khulumani FM Instagram"
                className="w-9 h-9 rounded-full bg-[#119e45] hover:bg-[#141414] text-white flex items-center justify-center text-xs font-black transition-colors"
              >
                IG
              </a>
            </div>

            <button
              type="button"
              onClick={togglePlay}
              className={`min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold shadow-md apple-spring active:scale-[0.96] ${
                isPlaying
                  ? "bg-[#141414] text-white"
                  : "bg-[#119e45] hover:bg-[#0d7e36] text-white"
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
              type="button"
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
            <Link
              href="/crm"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-bold text-khulumani-greenDark bg-khulumani-greenLight"
            >
              {sessionUser ? "Open CRM Studio" : "Studio CRM Login"}
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
