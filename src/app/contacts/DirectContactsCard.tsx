import { Phone, Mail, MapPin } from "lucide-react";
import type { StationContactsContent } from "@/types/radio";
import {
  FacebookBrandIcon,
  InstagramBrandIcon,
  XBrandIcon,
  TikTokBrandIcon,
  WhatsAppBrandIcon,
} from "@/components/SocialBrandIcons";

export function DirectContactsCard({
  contacts,
}: {
  readonly contacts: StationContactsContent;
}) {
  const socialLinks = [
    {
      href: contacts.socials.facebook,
      label: "Facebook",
      Icon: FacebookBrandIcon,
    },
    {
      href: contacts.socials.instagram,
      label: "Instagram",
      Icon: InstagramBrandIcon,
    },
    {
      href: contacts.socials.x,
      label: "X (Twitter)",
      Icon: XBrandIcon,
    },
    {
      href: contacts.socials.tiktok,
      label: "TikTok",
      Icon: TikTokBrandIcon,
    },
  ];

  return (
    <div className="lg:col-span-5 space-y-6">
      <div className="rounded-3xl bg-white border border-khulumani-border p-6 sm:p-8 shadow-sm space-y-5">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#119e45]">
            Direct Studio Lines
          </span>
          <h2 className="text-2xl font-black text-[#141414] mt-1">
            Get In Touch Directly
          </h2>
        </div>

        <div className="space-y-3.5">
          <a
            href={contacts.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-2xl bg-khulumani-greenLight border border-[#119e45]/30 hover:bg-[#119e45] hover:text-white transition-colors group"
          >
            <div className="w-11 h-11 rounded-xl bg-[#119e45] text-white group-hover:bg-white group-hover:text-[#119e45] flex items-center justify-center shrink-0">
              <WhatsAppBrandIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold opacity-80">
                WhatsApp &amp; Studio Mobile
              </div>
              <div className="text-base font-mono font-black">
                {contacts.mobile}
              </div>
            </div>
          </a>

          <a
            href={`tel:${contacts.phone.replace(/\s+/g, "")}`}
            className="flex items-center gap-4 p-4 rounded-2xl bg-khulumani-bg border border-khulumani-border hover:border-[#119e45] transition-colors"
          >
            <div className="w-11 h-11 rounded-xl bg-khulumani-greenLight text-[#119e45] flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-khulumani-muted">
                Reception &amp; Studio Desk
              </div>
              <div className="text-base font-mono font-black text-[#141414]">
                {contacts.phone}
              </div>
            </div>
          </a>

          <a
            href={`mailto:${contacts.email}`}
            className="flex items-center gap-4 p-4 rounded-2xl bg-khulumani-bg border border-khulumani-border hover:border-[#119e45] transition-colors"
          >
            <div className="w-11 h-11 rounded-xl bg-khulumani-greenLight text-[#119e45] flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-khulumani-muted">
                Email Address
              </div>
              <div className="text-sm font-black text-[#141414]">
                {contacts.email}
              </div>
            </div>
          </a>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-khulumani-bg border border-khulumani-border">
            <div className="w-11 h-11 rounded-xl bg-khulumani-greenLight text-[#119e45] flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-khulumani-muted">
                Physical Location
              </div>
              <div className="text-sm font-black text-[#141414]">
                {contacts.location}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-khulumani-border space-y-2.5">
          <div className="text-xs font-extrabold uppercase tracking-wider text-[#141414]">
            Official Social Channels
          </div>
          <div className="grid grid-cols-2 gap-2.5 text-xs font-extrabold">
            {socialLinks.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] px-3 py-2.5 rounded-xl bg-khulumani-greenLight text-[#141414] hover:bg-[#119e45] hover:text-white border border-[#119e45]/20 flex items-center justify-center gap-2 apple-spring active:scale-[0.96] group"
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
    </div>
  );
}
