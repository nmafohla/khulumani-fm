"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import {
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Send,
  CheckCircle2,
} from "lucide-react";
import { STATION_CONTACTS } from "@/lib/stationContent";

export default function ContactsPage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !subject.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Page Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-khulumani-greenDark via-khulumani-green to-khulumani-teal text-white p-8 sm:p-10 shadow-lg">
        <div className="max-w-2xl">
          <span className="inline-block px-3 py-1 rounded-full bg-black/20 text-amber-300 text-xs font-extrabold uppercase tracking-wider mb-3">
            Montrose Studios • Bulawayo
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Contact Us
          </h1>
          <p className="text-sm sm:text-base text-white/90 mt-2 leading-relaxed">
            Seriously, we want to hear about you! Whether you have a question,
            feedback, music submission, advertising inquiry, or just want to say
            hello, reach out to our team.
          </p>
        </div>
      </div>

      {/* Main Contact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Direct Contacts & Socials */}
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
                href={STATION_CONTACTS.whatsappUrl}
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
                    {STATION_CONTACTS.mobile}
                  </div>
                </div>
              </a>

              <a
                href="tel:+263292472730"
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
                    {STATION_CONTACTS.phone}
                  </div>
                </div>
              </a>

              <a
                href={`mailto:${STATION_CONTACTS.email}`}
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
                    {STATION_CONTACTS.email}
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
                    {STATION_CONTACTS.location}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="lg:col-span-7 rounded-3xl bg-white border border-khulumani-border p-6 sm:p-8 shadow-sm">
          <span className="text-xs font-extrabold uppercase tracking-wider text-khulumani-green">
            Send a Message
          </span>
          <h2 className="text-2xl font-black text-khulumani-ink mt-1">
            Seriously, We Want To Hear About You
          </h2>
          <p className="text-sm text-khulumani-muted mt-1">
            Fill out the form below and our Montrose Studios team will get back
            to you as soon as possible.
          </p>

          {submitted ? (
            <div className="mt-8 p-6 rounded-2xl bg-khulumani-greenLight border border-khulumani-green text-khulumani-greenDark space-y-3">
              <div className="flex items-center gap-2.5 font-black text-lg">
                <CheckCircle2 className="w-6 h-6 text-khulumani-green" />
                <span>Siyabonga! Message Received</span>
              </div>
              <p className="text-sm">
                Thank you, <strong>{name}</strong>. Your message regarding
                &ldquo;{subject}&rdquo; has been logged for the Khulumani FM
                95.0 desk. You can also forward it immediately via our studio
                WhatsApp line or email.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={`mailto:${STATION_CONTACTS.email}?subject=${encodeURIComponent(
                    subject
                  )}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`}
                  className="px-4 py-2 rounded-xl bg-khulumani-green text-white text-xs font-extrabold"
                >
                  Open in Email Client
                </a>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setName("");
                    setEmail("");
                    setSubject("");
                    setMessage("");
                  }}
                  className="px-4 py-2 rounded-xl bg-white border border-khulumani-border text-xs font-bold text-khulumani-ink"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-extrabold uppercase tracking-wider text-khulumani-ink mb-1.5"
                  >
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Nkosilathi Dube"
                    className="w-full px-4 py-3 rounded-xl bg-khulumani-bg border border-khulumani-border text-sm text-khulumani-ink focus:outline-none focus:border-khulumani-green"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-extrabold uppercase tracking-wider text-khulumani-ink mb-1.5"
                  >
                    Your Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-khulumani-bg border border-khulumani-border text-sm text-khulumani-ink focus:outline-none focus:border-khulumani-green"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-xs font-extrabold uppercase tracking-wider text-khulumani-ink mb-1.5"
                >
                  Subject *
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Song Dedication / Advertising Inquiry / Feedback"
                  className="w-full px-4 py-3 rounded-xl bg-khulumani-bg border border-khulumani-border text-sm text-khulumani-ink focus:outline-none focus:border-khulumani-green"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-extrabold uppercase tracking-wider text-khulumani-ink mb-1.5"
                >
                  Your Message (Optional)
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your shoutout, question, or message to the studio..."
                  className="w-full px-4 py-3 rounded-xl bg-khulumani-bg border border-khulumani-border text-sm text-khulumani-ink focus:outline-none focus:border-khulumani-green"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-khulumani-green hover:bg-khulumani-greenDark text-white text-sm font-extrabold shadow-md shadow-khulumani-green/25 transition-all active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Send Message to Studio</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
