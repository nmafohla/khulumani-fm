import crypto from "node:crypto";
import { describe, it, expect, beforeEach } from "vitest";
import {
  checkRateLimit,
  resetRateLimitsForTests,
  signSessionToken,
  verifySessionToken,
} from "../src/lib/serverAuth";
import {
  computeHasUnpublishedChanges,
  discardDraftChanges,
  getCmsSnapshot,
  publishDraftToMainSite,
  resetCmsStoreForTests,
  saveDraftContent,
} from "../src/lib/cmsStore";
import { DEFAULT_SITE_CONTENT } from "../src/lib/stationContent";
import {
  loginRequestSchema,
  siteContentPayloadSchema,
} from "../src/lib/cmsValidation";
import {
  MissingServerConfigError,
  getServerConfig,
  resetServerConfigCacheForTests,
} from "../src/lib/serverConfig";

describe("CRM Authentication, Permissions & Rate Limiting", () => {
  const ephemeralHmacKey = crypto.randomBytes(32).toString("hex");

  beforeEach(() => {
    resetRateLimitsForTests();
    resetCmsStoreForTests();
    resetServerConfigCacheForTests();
  });

  it("signs and verifies a valid admin session token", () => {
    const token = signSessionToken(
      {
        email: "editor@example.com",
        role: "admin",
        expiresAt: Date.now() + 60_000,
      },
      ephemeralHmacKey
    );

    const verified = verifySessionToken(token, ephemeralHmacKey);
    expect(verified).not.toBeNull();
    expect(verified?.email).toBe("editor@example.com");
    expect(verified?.role).toBe("admin");
  });

  it("rejects expired session tokens", () => {
    const token = signSessionToken(
      {
        email: "editor@example.com",
        role: "admin",
        expiresAt: Date.now() - 1000,
      },
      ephemeralHmacKey
    );

    const verified = verifySessionToken(token, ephemeralHmacKey);
    expect(verified).toBeNull();
  });

  it("rejects tampered session tokens", () => {
    const token = signSessionToken(
      {
        email: "editor@example.com",
        role: "admin",
        expiresAt: Date.now() + 60_000,
      },
      ephemeralHmacKey
    );
    const tampered = `${token}tamper`;
    expect(verifySessionToken(tampered, ephemeralHmacKey)).toBeNull();
  });

  it("enforces rate limits per key window", () => {
    const r1 = checkRateLimit("ip-1", 2, 60_000);
    const r2 = checkRateLimit("ip-1", 2, 60_000);
    const r3 = checkRateLimit("ip-1", 2, 60_000);

    expect(r1.allowed).toBe(true);
    expect(r2.allowed).toBe(true);
    expect(r3.allowed).toBe(false);
    expect(r3.retryAfterSeconds).toBeGreaterThan(0);
  });

  it("throws MissingServerConfigError when required env vars are missing", () => {
    expect(() => getServerConfig()).toThrow(MissingServerConfigError);
  });
});

describe("CRM Draft, Pre-Publish Preview & Publish Workflow", () => {
  beforeEach(() => {
    resetCmsStoreForTests();
  });

  it("validates default site content against Zod boundary schema", () => {
    const parsed = siteContentPayloadSchema.safeParse(DEFAULT_SITE_CONTENT);
    expect(parsed.success).toBe(true);
  });

  it("validates login input format at the boundary", () => {
    expect(
      loginRequestSchema.safeParse({
        email: "not-an-email",
        password: "123",
      }).success
    ).toBe(false);
  });

  it("stages draft updates without mutating published live content until published", () => {
    const initial = getCmsSnapshot();
    expect(initial.hasUnpublishedChanges).toBe(false);
    expect(initial.publishedVersion).toBe(1);

    const modifiedDraft = {
      ...initial.draft,
      hero: {
        ...initial.draft.hero,
        headline: "Bulawayo Live Festival Broadcast!",
      },
    };

    const afterDraftSave = saveDraftContent(modifiedDraft);
    expect(afterDraftSave.hasUnpublishedChanges).toBe(true);
    expect(afterDraftSave.draft.hero.headline).toBe(
      "Bulawayo Live Festival Broadcast!"
    );
    // Live published content remains untouched during preview stage
    expect(afterDraftSave.published.hero.headline).toBe(
      DEFAULT_SITE_CONTENT.hero.headline
    );

    // Promote draft to live main website
    const afterPublish = publishDraftToMainSite("studio@example.com");
    expect(afterPublish.hasUnpublishedChanges).toBe(false);
    expect(afterPublish.publishedVersion).toBe(2);
    expect(afterPublish.published.hero.headline).toBe(
      "Bulawayo Live Festival Broadcast!"
    );
    expect(afterPublish.lastPublishedBy).toBe("studio@example.com");
  });

  it("discards unpublished draft edits and reverts to live published content", () => {
    const modifiedDraft = {
      ...DEFAULT_SITE_CONTENT,
      contacts: {
        ...DEFAULT_SITE_CONTENT.contacts,
        heroTitle: "Temporary Draft Title",
      },
    };
    saveDraftContent(modifiedDraft);
    expect(
      computeHasUnpublishedChanges(DEFAULT_SITE_CONTENT, modifiedDraft)
    ).toBe(true);

    const reverted = discardDraftChanges();
    expect(reverted.hasUnpublishedChanges).toBe(false);
    expect(reverted.draft.contacts.heroTitle).toBe(
      DEFAULT_SITE_CONTENT.contacts.heroTitle
    );
  });
});
