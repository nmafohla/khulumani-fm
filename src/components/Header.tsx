"use client";

import { useEffect, useState } from "react";
import { Radio, Clock, MapPin, Signal } from "lucide-react";
import { getBulawayoTime } from "@/lib/schedule";

interface HeaderProps {
  isPlaying: boolean;
}

export function Header({ isPlaying }: HeaderProps) {
  const [timeString, setTimeString] = useState<string>("Loading CAT...");

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
    <header className="border-b border-station-border bg-station-card/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-station-gold to-station-amber text-station-dark shadow-lg shadow-station-gold/20 font-black">
            <Radio className="w-6 h-6 text-station-dark" />
            {isPlaying && (
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-station-red opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-station-red border-2 border-station-card"></span>
              </span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
                KHULUMANI <span className="text-station-gold">FM</span>
              </h1>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-station-gold/15 text-station-gold border border-station-gold/30">
                95.0 MHz
              </span>
            </div>
            <p className="text-xs text-station-muted font-medium hidden sm:block">
              The Voice of the City of Kings &amp; Queens
            </p>
          </div>
        </div>

        {/* Live Status and Bulawayo Clock */}
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-station-dark/80 border border-station-border text-station-muted">
            <Clock className="w-3.5 h-3.5 text-station-gold" />
            <span className="text-white font-mono">{timeString}</span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 text-xs text-station-muted">
            <MapPin className="w-3.5 h-3.5 text-station-teal" />
            <span>Montrose Studios, Bulawayo</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border transition-colors bg-station-dark/60 border-station-border">
            <Signal
              className={`w-3.5 h-3.5 ${
                isPlaying
                  ? "text-emerald-400 animate-pulse"
                  : "text-station-muted"
              }`}
            />
            <span
              className={isPlaying ? "text-emerald-400" : "text-station-muted"}
            >
              {isPlaying ? "ON AIR" : "STANDBY"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
