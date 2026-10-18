import { Sparkles } from "lucide-react";

const STUDIO_GALLERY = [
  {
    src: "/images/post-1.jpg",
    title: "Montrose Live Broadcast Desk",
    caption: "On-air roundtable & listener call-in booth • 95.0 FM",
  },
  {
    src: "/images/post-2.jpg",
    title: "Master Sound & Mixing Console",
    caption: "24/7 digital broadcast transmission • Bulawayo",
  },
  {
    src: "/images/cde-phil.jpg",
    title: "Chuu! Nomphulaphuli & Jam & Toast",
    caption: "Official Studio Host Poster • Live on 95.0 Byo",
  },
  {
    src: "/images/studio-host-1.png",
    title: "The Morning After Studio Line",
    caption: "Direct Studio Call & WhatsApp Desk • +263 292 472 730",
  },
] as const;

export function StudioGallerySection() {
  return (
    <section className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-khulumani-green">
            <Sparkles className="w-3.5 h-3.5" />
            Inside Montrose Studios • Bulawayo
          </span>
          <h2 className="text-2xl font-black text-khulumani-ink mt-0.5">
            Our Broadcast Desks &amp; Live Call-In Lines
          </h2>
        </div>
        <span className="text-xs font-bold text-khulumani-muted">
          Official Khulumani FM 95.0 Studio Imagery
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {STUDIO_GALLERY.map((item) => (
          <div
            key={item.title}
            className="rounded-3xl bg-white border border-khulumani-border overflow-hidden shadow-sm hover:shadow-md hover:border-khulumani-green transition-all group"
          >
            <div className="relative h-52 overflow-hidden bg-khulumani-greenDark">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.title}
                width={320}
                height={208}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="text-sm font-black text-khulumani-ink">
                {item.title}
              </h3>
              <p className="text-xs text-khulumani-muted mt-1">
                {item.caption}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
