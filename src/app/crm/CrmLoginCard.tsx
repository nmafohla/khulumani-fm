"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Lock, Mail, ShieldCheck, AlertCircle, Loader2 } from "lucide-react";

interface CrmLoginCardProps {
  readonly onLoginSuccess: () => Promise<void>;
}

export function CrmLoginCard({ onLoginSuccess }: CrmLoginCardProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = (await response.json()) as {
        authenticated?: boolean;
        error?: string;
      };

      if (!response.ok || !data.authenticated) {
        setErrorMessage(
          data.error ?? "Authentication failed. Please check your credentials."
        );
        setIsSubmitting(false);
        return;
      }

      await onLoginSuccess();
    } catch {
      setErrorMessage("Unable to reach authentication server. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto my-10 px-4">
      <div className="rounded-[32px] bg-white border-2 border-[#141414] shadow-2xl overflow-hidden">
        {/* Khulumani Logo-Matched Skyline Studio Header */}
        <div className="relative bg-[#0c120e] p-6 sm:p-8 text-white overflow-hidden border-b-4 border-[#119e45]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/apple-radio-hero.webp"
            alt="Khulumani FM 95.0 Bulawayo Skyline Studio"
            width={640}
            height={360}
            className="absolute inset-0 w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c120e] via-[#0c120e]/80 to-transparent" />

          <div className="relative z-10 flex items-center justify-between gap-4 mb-4">
            <div className="px-3.5 py-2 rounded-2xl bg-white shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo.png"
                alt="Khulumani FM 95.0 Logo"
                width={116}
                height={60}
                className="h-10 w-auto object-contain"
              />
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#119e45] text-white text-xs font-black uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              Studio CRM
            </span>
          </div>

          <h1 className="relative z-10 text-2xl sm:text-3xl font-black tracking-tight text-white">
            Montrose Broadcast CRM
          </h1>
          <p className="relative z-10 text-xs sm:text-sm text-white/85 mt-1.5 leading-relaxed">
            Sign in with your Khulumani FM 95.0 credentials to update schedules,
            charts, personalities, and news, and preview changes before
            publishing live.
          </p>
        </div>

        <form
          action="/api/auth/login"
          method="POST"
          onSubmit={(e) => void handleSubmit(e)}
          className="p-6 sm:p-8"
        >
          <fieldset className="space-y-4">
            <legend className="sr-only">
              Khulumani FM CRM Administrator Sign In
            </legend>

            {errorMessage && (
              <div
                id="crm-login-error"
                role="alert"
                aria-live="assertive"
                className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs font-bold flex items-start gap-2.5"
              >
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div>
              <label
                htmlFor="crm-email"
                className="block text-xs font-black uppercase tracking-wider text-[#141414] mb-1.5"
              >
                Studio Admin Email *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-khulumani-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="crm-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  required
                  aria-describedby={
                    errorMessage ? "crm-login-error" : undefined
                  }
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="studio@khulumanifm.co.zw"
                  className="w-full min-h-[48px] pl-10 pr-4 py-3 rounded-2xl bg-khulumani-bg border border-khulumani-border text-base sm:text-sm text-[#141414] focus:outline-none focus:border-[#119e45]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="crm-password"
                className="block text-xs font-black uppercase tracking-wider text-[#141414] mb-1.5"
              >
                Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-khulumani-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="crm-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  aria-describedby={
                    errorMessage ? "crm-login-error" : undefined
                  }
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your studio password"
                  className="w-full min-h-[48px] pl-10 pr-4 py-3 rounded-2xl bg-khulumani-bg border border-khulumani-border text-base sm:text-sm text-[#141414] focus:outline-none focus:border-[#119e45]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full min-h-[52px] py-3.5 px-6 rounded-2xl bg-[#119e45] hover:bg-[#141414] text-white text-sm font-black uppercase tracking-wider shadow-lg apple-spring active:scale-[0.96] flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Server Session...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Sign In to CRM Studio</span>
                </>
              )}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
