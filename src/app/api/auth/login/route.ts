import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { loginRequestSchema } from "@/lib/cmsValidation";
import {
  SESSION_COOKIE_NAME,
  checkRateLimit,
  createSafeErrorResponse,
  getClientIp,
  signSessionToken,
  verifyAdminCredentials,
  verifyAllowedOrigin,
} from "@/lib/serverAuth";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    if (!verifyAllowedOrigin(request)) {
      return NextResponse.json(
        { error: "Forbidden request origin." },
        { status: 403 }
      );
    }

    const clientIp = getClientIp(request);
    const rate = checkRateLimit(`login:${clientIp}`, 8, 5 * 60 * 1000);
    if (!rate.allowed) {
      return NextResponse.json(
        {
          error: `Too many login attempts. Please retry in ${rate.retryAfterSeconds} seconds.`,
        },
        {
          status: 429,
          headers: { "Retry-After": String(rate.retryAfterSeconds) },
        }
      );
    }

    const rawBody: unknown = await request.json();
    const parsed = loginRequestSchema.safeParse(rawBody);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid email or password format." },
        { status: 400 }
      );
    }

    const sessionUser = await verifyAdminCredentials(
      parsed.data.email,
      parsed.data.password
    );
    if (!sessionUser) {
      return NextResponse.json(
        {
          error:
            "Invalid studio credentials. Please check your email and password.",
        },
        { status: 401 }
      );
    }

    const token = signSessionToken(sessionUser);
    const response = NextResponse.json({
      authenticated: true,
      user: sessionUser,
    });

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
    });

    return response;
  } catch (err: unknown) {
    return createSafeErrorResponse("POST /api/auth/login", err);
  }
}
