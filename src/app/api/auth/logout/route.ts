import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  SESSION_COOKIE_NAME,
  createSafeErrorResponse,
  requireServerRole,
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

    const user = requireServerRole(request, ["admin", "editor"]);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const response = NextResponse.json({ authenticated: false });
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });
    return response;
  } catch (err: unknown) {
    return createSafeErrorResponse("POST /api/auth/logout", err);
  }
}
