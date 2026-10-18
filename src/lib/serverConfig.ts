/**
 * Server-side configuration and security boundary policy.
 * Reads all required secrets from environment variables with zero hardcoded fallbacks.
 */

export class MissingServerConfigError extends Error {
  public readonly missingKey: string;

  constructor(missingKey: string) {
    super(
      `Missing required server environment variable: ${missingKey}. Configure it in .env.local or deployment environment settings.`
    );
    this.name = "MissingServerConfigError";
    this.missingKey = missingKey;
  }
}

export interface ServerConfig {
  readonly adminEmail: string;
  readonly adminPasswordHash: string;
  readonly sessionSecret: string;
  readonly allowedOrigins: readonly string[];
}

let cachedConfig: ServerConfig | null = null;

function requireEnv(key: string): string {
  const value = process.env[key]?.trim();
  if (!value) {
    throw new MissingServerConfigError(key);
  }
  return value;
}

/**
 * Validates and returns the server configuration.
 * Throws MissingServerConfigError if any required variable is absent.
 */
export function getServerConfig(): ServerConfig {
  if (cachedConfig) {
    return cachedConfig;
  }

  const adminEmail = requireEnv("CRM_ADMIN_EMAIL");
  const adminPasswordHash = requireEnv("CRM_ADMIN_PASSWORD_HASH");
  const sessionSecret = requireEnv("CRM_SESSION_SECRET");
  const rawOrigins = requireEnv("ALLOWED_ORIGINS");

  const allowedOrigins = rawOrigins
    .split(",")
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0);

  if (allowedOrigins.length === 0) {
    throw new MissingServerConfigError("ALLOWED_ORIGINS");
  }

  cachedConfig = {
    adminEmail,
    adminPasswordHash,
    sessionSecret,
    allowedOrigins,
  };

  return cachedConfig;
}

/**
 * Reset cached config in unit tests.
 */
export function resetServerConfigCacheForTests(): void {
  cachedConfig = null;
}

/**
 * Explicit allowlist of public API routes and methods, documented in one place.
 * Every API route/method NOT listed here requires a valid server-verified CRM session.
 */
export const PUBLIC_API_ROUTES: ReadonlyArray<{
  readonly path: string;
  readonly method: "GET" | "POST";
  readonly reason: string;
}> = [
  {
    path: "/api/auth/login",
    method: "POST",
    reason:
      "Public authentication endpoint allowing studio staff to exchange credentials for an HttpOnly server session cookie (protected by rate limiting).",
  },
  {
    path: "/api/cms/content",
    method: "GET",
    reason:
      "Public read-only endpoint serving published station content (schedule, charts, news, team, contacts) to website listeners (rate-limited; draft preview requires server session).",
  },
];
