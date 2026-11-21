import crypto from "node:crypto";
import { NextRequest } from "next/server";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { middleware } from "../src/middleware";

describe("Site Lock Middleware", () => {
  const origPassword = process.env.SITE_LOCK_PASSWORD;
  const origSecret = process.env.SITE_LOCK_SECRET;

  beforeEach(() => {
    process.env.SITE_LOCK_PASSWORD = "test-gate-password";
    process.env.SITE_LOCK_SECRET = crypto.randomBytes(32).toString("hex");
  });

  afterEach(() => {
    if (origPassword === undefined) {
      delete process.env.SITE_LOCK_PASSWORD;
    } else {
      process.env.SITE_LOCK_PASSWORD = origPassword;
    }
    if (origSecret === undefined) {
      delete process.env.SITE_LOCK_SECRET;
    } else {
      process.env.SITE_LOCK_SECRET = origSecret;
    }
  });

  it("returns 503 when site lock env vars are missing", async () => {
    delete process.env.SITE_LOCK_PASSWORD;
    const req = new NextRequest("https://example.com/");
    const res = await middleware(req);
    expect(res.status).toBe(503);
  });

  it("returns 401 HTML for unauthenticated page requests", async () => {
    const req = new NextRequest("https://example.com/news?page=2");
    const res = await middleware(req);
    expect(res.status).toBe(401);
    const body = await res.text();
    expect(body).toContain("Enter Access Password");
    expect(body).toContain('value="/news?page=2"');
  });

  it("returns 401 JSON for unauthenticated API requests", async () => {
    const req = new NextRequest("https://example.com/api/cms/content");
    const res = await middleware(req);
    expect(res.status).toBe(401);
    expect(await res.json()).toEqual({ error: "Authentication required" });
  });

  it("returns 401 on wrong password and 303 + cookie on valid password", async () => {
    const wrongReq = new NextRequest("https://example.com/__hakili_lock", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: "password=wrong-pass&next=%2Fcrm",
    });
    const wrongRes = await middleware(wrongReq);
    expect(wrongRes.status).toBe(401);
    expect(await wrongRes.text()).toContain("Incorrect password");

    const okReq = new NextRequest("https://example.com/__hakili_lock", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: "password=test-gate-password&next=%2Fcrm",
    });
    const okRes = await middleware(okReq);
    expect(okRes.status).toBe(303);
    expect(okRes.headers.get("location")).toBe("https://example.com/crm");
    const setCookie = okRes.headers.get("set-cookie");
    expect(setCookie).toContain("hakili_site_lock=");
    expect(setCookie).toContain("HttpOnly");

    const cookiePair = setCookie?.split(";")[0] ?? "";
    const authedReq = new NextRequest("https://example.com/crm", {
      headers: { cookie: cookiePair },
    });
    const authedRes = await middleware(authedReq);
    expect(authedRes.status).toBe(200);
    expect(authedRes.headers.get("x-middleware-next")).toBe("1");
  });
});
