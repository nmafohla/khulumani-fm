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
    <div className="max-w-md mx-auto my-12 px-4">
      <div className="rounded-3xl bg-white border-2 border-khulumani-border shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-khulumani-greenDark via-khulumani-green to-khulumani-teal p-6 sm:p-8 text-white">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/25 text-amber-300 text-xs font-extrabold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            Montrose Broadcast CRM
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Studio Content Login
          </h1>
          <p className="text-xs sm:text-sm text-white/90 mt-1.5 leading-relaxed">
            Sign in with your authorized Khulumani FM 95.0 administrator
            credentials to update schedules, charts, news, and preview changes
            before publishing live.
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
                className="block text-xs font-extrabold uppercase tracking-wider text-khulumani-ink mb-1"
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
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-khulumani-bg border border-khulumani-border text-sm text-khulumani-ink focus:outline-none focus:border-khulumani-green"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="crm-password"
                className="block text-xs font-extrabold uppercase tracking-wider text-khulumani-ink mb-1"
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
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-khulumani-bg border border-khulumani-border text-sm text-khulumani-ink focus:outline-none focus:border-khulumani-green"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-2xl bg-khulumani-green hover:bg-khulumani-greenDark text-white text-sm font-extrabold shadow-md shadow-khulumani-green/25 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
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
