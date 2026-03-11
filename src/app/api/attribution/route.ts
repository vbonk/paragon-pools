// Attribution API endpoint. Standard: ai-marketing/standards/analytics.md
import { NextRequest, NextResponse } from "next/server";
import { getDb, schema } from "@/lib/db";
import { classifyReferrer } from "@/lib/referrer-classifier";
import { hashIp } from "@/lib/hash";

const CLIENT_SLUG = "paragon-pools";

const MAX_STRING = 2000;
function clamp(val: unknown, max = MAX_STRING): string | null {
  if (typeof val !== "string") return null;
  return val.slice(0, max) || null;
}

function clampInt(val: unknown, min = 0, max = 100000): number | null {
  const n = typeof val === "number" ? val : parseInt(String(val), 10);
  if (Number.isNaN(n)) return null;
  return Math.max(min, Math.min(max, Math.floor(n)));
}

export async function POST(request: NextRequest) {
  // Reject oversized payloads
  const contentLength = request.headers.get("content-length");
  if (contentLength && parseInt(contentLength, 10) > 10_000) {
    return new NextResponse(null, { status: 204 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return new NextResponse(null, { status: 204 });
  }

  // Validate client slug matches this site
  const clientSlug = clamp(body.client);
  if (clientSlug && clientSlug !== CLIENT_SLUG) {
    return new NextResponse(null, { status: 204 });
  }

  const referrer = clamp(body.referrer);
  const utmSource = clamp(body.utm_source);
  const category = classifyReferrer(referrer, utmSource);

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  try {
    const db = getDb();
    await db.insert(schema.attributionEvents).values({
      clientSlug: CLIENT_SLUG,
      referrer,
      referrerCategory: category,
      landingPage: clamp(body.page),
      utmSource,
      utmMedium: clamp(body.utm_medium),
      utmCampaign: clamp(body.utm_campaign),
      sessionDurationMs: clampInt(body.duration),
      scrollDepthPct: clampInt(body.scroll, 0, 100),
      pagesViewed: clampInt(body.pages, 1, 10000) ?? 1,
      conversionType: clamp(body.conversion_type),
      userAgent: clamp(request.headers.get("user-agent")),
      ipHash: hashIp(ip),
    });
  } catch (err) {
    console.error("Attribution insert error:", err);
  }

  // Silent 204 — never reveal errors to caller
  return new NextResponse(null, { status: 204 });
}
