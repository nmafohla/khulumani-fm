"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Send, CheckCircle2, Radio } from "lucide-react";
import { useSiteContent } from "@/context/SiteContentContext";
import { DirectContactsCard } from "@/app/contacts/DirectContactsCard";
import { StudioGallerySection } from "@/app/contacts/StudioGallerySection";

export default function ContactsPage() {
  const { activeContent } = useSiteContent();
  const contacts = activeContent.contacts;

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
      {/* Page Hero Banner with Original Studio Image Backdrop */}
      <div className="relative rounded-3xl overflow-hidden bg-khulumani-greenDark text-white shadow-xl border border-khulumani-green/30">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/post-1.jpg"
          alt="Khulumani FM 95.0 Montrose Studios Bulawayo"
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-khulumani-greenDark/95 via-khulumani-green/90 to-khulumani-teal/85" />

        <div className="relative z-10 p-8 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/25 text-amber-300 text-xs font-extrabold uppercase tracking-wider">
              <Radio className="w-3.5 h-3.5" />
              {contacts.location} • {contacts.frequency}
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
              {contacts.heroTitle}
            </h1>
            <p className="text-sm sm:text-base text-white/95 leading-relaxed max-w-2xl">
              {contacts.heroSubtitle}
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            <div className="rounded-2xl overflow-hidden border-2 border-white/25 shadow-lg bg-black/30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/show-banner.jpg"
                alt="Khulumani FM On Air Microphone"
                className="w-full h-36 sm:h-40 object-cover"
              />
              <div className="p-2.5 text-[11px] font-extrabold text-amber-200 bg-black/50">
                ON AIR • 95.0 MHz FM
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border-2 border-white/25 shadow-lg bg-black/30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/post-2.jpg"
                alt="Khulumani FM Studio Mixing Desk"
                className="w-full h-36 sm:h-40 object-cover"
              />
              <div className="p-2.5 text-[11px] font-extrabold text-emerald-200 bg-black/50">
                Montrose Broadcast Desk
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Contact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <DirectContactsCard contacts={contacts} />

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
            <div
              role="status"
              aria-live="polite"
              className="mt-8 p-6 rounded-2xl bg-khulumani-greenLight border border-khulumani-green text-khulumani-greenDark space-y-3"
            >
              <div className="flex items-center gap-2.5 font-black text-lg">
                <CheckCircle2 className="w-6 h-6 text-khulumani-green" />
                <span>Siyabonga! Message Received</span>
              </div>
              <p className="text-sm">
                Thank you, <strong>{name}</strong>. Your message regarding
                &ldquo;{subject}&rdquo; has been logged for the Khulumani FM
                95.0 desk.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={`mailto:${contacts.email}?subject=${encodeURIComponent(
                    subject
                  )}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`}
                  className="px-4 py-2 rounded-xl bg-khulumani-green text-white text-xs font-extrabold"
                >
                  Open in Email Client
                </a>
                <button
                  type="button"
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
            <form
              action="/contacts"
              method="POST"
              onSubmit={handleSubmit}
              className="mt-6"
            >
              <fieldset className="space-y-4">
                <legend className="sr-only">
                  Montrose Studios Listener &amp; Advertising Contact Form
                </legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-extrabold uppercase tracking-wider text-khulumani-ink mb-1"
                    >
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
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
                      className="block text-xs font-extrabold uppercase tracking-wider text-khulumani-ink mb-1"
                    >
                      Your Email *
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck={false}
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
                    className="block text-xs font-extrabold uppercase tracking-wider text-khulumani-ink mb-1"
                  >
                    Subject *
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
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
                    className="block text-xs font-extrabold uppercase tracking-wider text-khulumani-ink mb-1"
                  >
                    Your Message (Optional)
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
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
              </fieldset>
            </form>
          )}
        </div>
      </div>

      <StudioGallerySection />
    </div>
  );
}
