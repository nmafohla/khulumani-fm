import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createSafeErrorResponse, requireServerRole } from "@/lib/serverAuth";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const user = requireServerRole(request, ["admin", "editor"]);
    if (!user) {
      return NextResponse.json(
        { authenticated: false, user: null },
        { status: 401 }
      );
    }

    return NextResponse.json({
      authenticated: true,
      user,
    });
  } catch (err: unknown) {
    return createSafeErrorResponse("GET /api/auth/session", err);
  }
}
