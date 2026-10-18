import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { CmsSessionUser } from "@/types/radio";
import { getServerConfig } from "@/lib/serverConfig";

export const SESSION_COOKIE_NAME = "khulumani_crm_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 hours

interface RateBucket {
  count: number;
  resetAt: number;
}

// shortcut: in-memory rate-limit map per serverless instance, upgrade to Redis/Upstash for multi-region cluster sync
const rateBuckets = new Map<string, RateBucket>();

/**
 * Sliding/fixed window rate limiter for auth and public endpoints.
 */
export function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): { readonly allowed: boolean; readonly retryAfterSeconds: number } {
  const now = Date.now();
  const existing = rateBuckets.get(key);

  if (!existing || now >= existing.resetAt) {
    rateBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (existing.count >= maxRequests) {
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((existing.resetAt - now) / 1000)
    );
    return { allowed: false, retryAfterSeconds };
  }

  existing.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

export function resetRateLimitsForTests(): void {
  rateBuckets.clear();
}

/**
 * Extracts client IP address for rate-limiting securely using trusted edge headers.
 */
export function getClientIp(request: NextRequest): string {
  const realIp =
    request.headers.get("x-real-ip") || request.headers.get("x-vercel-ip");
  if (realIp) return realIp.trim();

  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const parts = forwarded
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const trustedIp = parts[parts.length - 1];
    if (trustedIp) return trustedIp;
  }
  return "127.0.0.1";
}

// Constant dummy hash to maintain identical response time on non-matching email lookups
const DUMMY_BCRYPT_HASH =
  "$2a$12$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy";

/**
 * Verifies admin credentials strictly on the server using constant-time comparison and bcrypt.
 */
export async function verifyAdminCredentials(
  emailInput: string,
  passwordInput: string
): Promise<CmsSessionUser | null> {
  const config = getServerConfig();
  const normalizedInput = emailInput.trim().toLowerCase();
  const normalizedAdmin = config.adminEmail.trim().toLowerCase();

  // Equalize string lengths for timingSafeEqual
  const maxLen = Math.max(normalizedInput.length, normalizedAdmin.length, 64);
  const inputBuf = Buffer.from(normalizedInput.padEnd(maxLen, " "), "utf8");
  const adminBuf = Buffer.from(normalizedAdmin.padEnd(maxLen, " "), "utf8");
  const isEmailMatch = crypto.timingSafeEqual(inputBuf, adminBuf);

  // Always compute bcrypt to prevent user enumeration via response timing side-channel
  const targetHash = isEmailMatch
    ? config.adminPasswordHash
    : DUMMY_BCRYPT_HASH;
  const isPasswordValid = await bcrypt.compare(passwordInput, targetHash);

  if (!isEmailMatch || !isPasswordValid) {
    return null;
  }

  return {
    email: config.adminEmail,
    role: "admin",
    expiresAt: Date.now() + SESSION_TTL_SECONDS * 1000,
  };
}

/**
 * Signs a session payload with HMAC-SHA256.
 */
export function signSessionToken(
  user: CmsSessionUser,
  secretOverride?: string
): string {
  const secret = secretOverride ?? getServerConfig().sessionSecret;
  const payloadBase64 = Buffer.from(JSON.stringify(user), "utf8").toString(
    "base64url"
  );
  const signature = crypto
    .createHmac("sha256", secret)
    .update(payloadBase64)
    .digest("base64url");
  return `${payloadBase64}.${signature}`;
}

/**
 * Verifies an HMAC-SHA256 signed session token and checks expiration.
 */
export function verifySessionToken(
  token: string | undefined,
  secretOverride?: string
): CmsSessionUser | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const payloadBase64 = parts[0];
  const signature = parts[1];
  if (!payloadBase64 || !signature) return null;

  const secret = secretOverride ?? getServerConfig().sessionSecret;
  const expectedSig = crypto
    .createHmac("sha256", secret)
    .update(payloadBase64)
    .digest("base64url");

  const sigBuffer = Buffer.from(signature, "utf8");
  const expectedBuffer = Buffer.from(expectedSig, "utf8");
  if (
    sigBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(sigBuffer, expectedBuffer)
  ) {
    return null;
  }

  try {
    const decoded = JSON.parse(
      Buffer.from(payloadBase64, "base64url").toString("utf8")
    ) as unknown;
    if (
      typeof decoded !== "object" ||
      decoded === null ||
      !("email" in decoded) ||
      !("role" in decoded) ||
      !("expiresAt" in decoded)
    ) {
      return null;
    }

    const user = decoded as CmsSessionUser;
    if (typeof user.expiresAt !== "number" || Date.now() >= user.expiresAt) {
      return null;
    }
    if (user.role !== "admin" && user.role !== "editor") {
      return null;
    }
    return user;
  } catch {
    return null;
  }
}

/**
 * Enforces server-side authentication and role-based authorization on a route.
 */
export function requireServerRole(
  request: NextRequest,
  allowedRoles: readonly ("admin" | "editor")[]
): CmsSessionUser | null {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const user = verifySessionToken(token);
  if (!user) return null;
  if (!allowedRoles.includes(user.role)) return null;
  return user;
}

/**
 * Validates the Origin header against the explicit ALLOWED_ORIGINS allowlist on state-changing routes.
 */
export function verifyAllowedOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) {
    // Same-origin non-CORS or server test request
    return true;
  }
  const { allowedOrigins } = getServerConfig();
  return allowedOrigins.includes(origin);
}

/**
 * Logs internal error details server-side with a correlation ID and returns a safe generic client response.
 */
export function createSafeErrorResponse(
  context: string,
  err: unknown,
  status = 500
): NextResponse {
  const correlationId = crypto.randomUUID();
  console.error(`[${correlationId}] ${context}:`, err);
  return NextResponse.json(
    {
      error: "Unable to complete request. Please try again.",
      correlationId,
    },
    { status }
  );
}
