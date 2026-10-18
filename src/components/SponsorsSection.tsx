"use client";

const SPONSOR_LOGOS = [
  {
    id: "rock-pick",
    name: "Rock Pick Records",
    src: "/images/rock-sponsor-5.png",
    invert: false,
  },
  {
    id: "sound-record",
    name: "Sound Record",
    src: "/images/sponsor-5.png",
    invert: true,
  },
  {
    id: "rock-skull",
    name: "Rock Studio Sessions",
    src: "/images/rock-sponsor-4.png",
    invert: false,
  },
  {
    id: "music-studio",
    name: "Music Studio",
    src: "/images/sponsor-4.png",
    invert: true,
  },
  {
    id: "rock-hand",
    name: "Live Stage Broadcast",
    src: "/images/rock-sponsor-3.png",
    invert: false,
  },
  {
    id: "guitar-empire",
    name: "Guitar Empire",
    src: "/images/sponsor-3.png",
    invert: true,
  },
] as const;

export function SponsorsSection() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-sponsors-stage shadow-2xl border-2 border-[#141414]">
      {/* Khulumani Kelly-Green & Jet-Black Stage Tint + Jagged Lightning & Grunge Splatter Overlay */}
      <div className="absolute inset-0 bg-[#0b1710]/75" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-sponsors-grunge-overlay pointer-events-none opacity-95"
        aria-hidden="true"
      />

      <div className="relative z-10 px-6 sm:px-10 py-14 sm:py-16">
        {/* Skewed White Parallelogram "SPONSORS" Header Badge */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="bg-white text-[#141414] font-black text-2xl sm:text-4xl uppercase tracking-wider px-10 py-3 clip-skew-badge shadow-xl border-b-4 border-[#119e45]">
            SPONSORS
          </div>
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#4ade80] mt-3">
            Montrose Studios Broadcast &amp; Music Production Partners
          </p>
        </div>

        {/* 6 Authentic Sponsor Emblems */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 items-center justify-items-center max-w-6xl mx-auto">
          {SPONSOR_LOGOS.map((logo) => (
            <div
              key={logo.id}
              className="group flex items-center justify-center p-4 rounded-2xl bg-black/40 hover:bg-[#119e45]/30 border border-white/15 hover:border-[#22c55e] apple-spring w-full h-32"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt={logo.name}
                width={140}
                height={110}
                loading="lazy"
                className={`max-h-20 sm:max-h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105 ${
                  logo.invert ? "brightness-0 invert opacity-95" : "opacity-95"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
