import { z } from "zod";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { siteContentPayloadSchema } from "@/lib/cmsValidation";
import {
  discardDraftChanges,
  getCmsSnapshot,
  publishDraftToMainSite,
  saveDraftContent,
} from "@/lib/cmsStore";
import {
  checkRateLimit,
  createSafeErrorResponse,
  getClientIp,
  requireServerRole,
  verifyAllowedOrigin,
} from "@/lib/serverAuth";

const cmsActionSchema = z.discriminatedUnion("action", [
  z.object({
    action: z.literal("publish"),
    draft: siteContentPayloadSchema.optional(),
  }),
  z.object({
    action: z.literal("discard"),
  }),
]);

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const clientIp = getClientIp(request);
    const rate = checkRateLimit(`cms-get:${clientIp}`, 120, 60 * 1000);
    if (!rate.allowed) {
      return NextResponse.json(
        { error: "Rate limit exceeded." },
        { status: 429 }
      );
    }

    const mode = request.nextUrl.searchParams.get("mode");
    const snapshot = getCmsSnapshot();

    const user = requireServerRole(request, ["admin", "editor"]);

    if (mode === "cms") {
      if (!user) {
        return NextResponse.json(
          { error: "Authentication required to access CRM draft state." },
          { status: 401 }
        );
      }
      return NextResponse.json({ snapshot, user });
    }

    return NextResponse.json({
      published: snapshot.published,
      publishedVersion: snapshot.publishedVersion,
      lastPublishedAt: snapshot.lastPublishedAt,
      ...(user ? { snapshot, user } : { user: null }),
    });
  } catch (err: unknown) {
    return createSafeErrorResponse("GET /api/cms/content", err);
  }
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
  try {
    if (!verifyAllowedOrigin(request)) {
      return NextResponse.json(
        { error: "Forbidden request origin." },
        { status: 403 }
      );
    }

    const user = requireServerRole(request, ["admin", "editor"]);
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in to save draft changes." },
        { status: 401 }
      );
    }

    const rawBody: unknown = await request.json();
    const parsed = siteContentPayloadSchema.safeParse(rawBody);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid content payload. Check all required fields." },
        { status: 400 }
      );
    }

    const snapshot = saveDraftContent(parsed.data);
    return NextResponse.json({ snapshot });
  } catch (err: unknown) {
    return createSafeErrorResponse("PUT /api/cms/content", err);
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    if (!verifyAllowedOrigin(request)) {
      return NextResponse.json(
        { error: "Forbidden request origin." },
        { status: 403 }
      );
    }

    const user = requireServerRole(request, ["admin"]);
    if (!user) {
      return NextResponse.json(
        {
          error:
            "Forbidden. Admin role required to publish or discard changes.",
        },
        { status: 403 }
      );
    }

    const rawBody: unknown = await request.json();
    const parsed = cmsActionSchema.safeParse(rawBody);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid publish/discard action request." },
        { status: 400 }
      );
    }

    if (parsed.data.action === "discard") {
      const snapshot = discardDraftChanges();
      return NextResponse.json({ snapshot });
    }

    const snapshot = publishDraftToMainSite(user.email, parsed.data.draft);
    return NextResponse.json({ snapshot });
  } catch (err: unknown) {
    return createSafeErrorResponse("POST /api/cms/content", err);
  }
}
