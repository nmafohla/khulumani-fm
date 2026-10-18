import { Phone, Mail, MapPin, MessageSquare } from "lucide-react";
import type { StationContactsContent } from "@/types/radio";

export function DirectContactsCard({
  contacts,
}: {
  readonly contacts: StationContactsContent;
}) {
  return (
    <div className="lg:col-span-5 space-y-6">
      <div className="rounded-3xl bg-white border border-khulumani-border p-6 sm:p-8 shadow-sm space-y-5">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-khulumani-green">
            Direct Studio Lines
          </span>
          <h2 className="text-2xl font-black text-khulumani-ink mt-1">
            Get In Touch Directly
          </h2>
        </div>

        <div className="space-y-3.5">
          <a
            href={contacts.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-2xl bg-khulumani-greenLight border border-khulumani-green/30 hover:bg-khulumani-green hover:text-white transition-colors group"
          >
            <div className="w-11 h-11 rounded-xl bg-khulumani-green text-white group-hover:bg-white group-hover:text-khulumani-greenDark flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5" />
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
            className="flex items-center gap-4 p-4 rounded-2xl bg-khulumani-bg border border-khulumani-border hover:border-khulumani-green transition-colors"
          >
            <div className="w-11 h-11 rounded-xl bg-khulumani-greenLight text-khulumani-greenDark flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-khulumani-muted">
                Reception &amp; Studio Desk
              </div>
              <div className="text-base font-mono font-black text-khulumani-ink">
                {contacts.phone}
              </div>
            </div>
          </a>

          <a
            href={`mailto:${contacts.email}`}
            className="flex items-center gap-4 p-4 rounded-2xl bg-khulumani-bg border border-khulumani-border hover:border-khulumani-green transition-colors"
          >
            <div className="w-11 h-11 rounded-xl bg-khulumani-greenLight text-khulumani-greenDark flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-khulumani-muted">
                Email Address
              </div>
              <div className="text-sm font-black text-khulumani-ink">
                {contacts.email}
              </div>
            </div>
          </a>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-khulumani-bg border border-khulumani-border">
            <div className="w-11 h-11 rounded-xl bg-khulumani-greenLight text-khulumani-greenDark flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-khulumani-muted">
                Physical Location
              </div>
              <div className="text-sm font-black text-khulumani-ink">
                {contacts.location}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
