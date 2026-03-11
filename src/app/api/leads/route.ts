import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createHash } from "crypto";
import { rateLimit } from "@/lib/rate-limit";
import { getDb, schema } from "@/lib/db";

const leadSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  email: z.string().email("Invalid email").max(254),
  phone: z.string().max(20).optional(),
  interest: z.string().max(200).optional(),
  timeline: z.string().max(200).optional(),
  budget: z.string().max(50).optional(),
  referralSource: z.string().max(200).optional(),
  message: z.string().max(2000).optional(),
  sourcePage: z.string().max(500).optional(),
});

function hashIp(ip: string): string {
  return createHash("sha256").update(ip).digest("hex").slice(0, 16);
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    const { success, remaining } = rateLimit(ip);
    if (!success) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: { "Retry-After": "3600", "X-RateLimit-Remaining": "0" },
        }
      );
    }

    const contentType = request.headers.get("content-type") || "";
    let raw: Record<string, string> = {};

    if (contentType.includes("application/json")) {
      raw = await request.json();
    } else {
      const formData = await request.formData();
      formData.forEach((value, key) => {
        if (typeof value === "string") raw[key] = value;
      });
    }

    // Honeypot check — if filled, it's a bot. Return fake success.
    if (raw._website) {
      return NextResponse.json({ success: true }, { status: 201 });
    }
    delete raw._website;

    // Validate
    const parsed = leadSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // Build message with extra fields appended
    const extras: string[] = [];
    if (parsed.data.interest) extras.push(`Interest: ${parsed.data.interest}`);
    if (parsed.data.timeline) extras.push(`Timeline: ${parsed.data.timeline}`);
    if (parsed.data.budget) extras.push(`Budget: ${parsed.data.budget}`);
    if (parsed.data.referralSource)
      extras.push(`Referral Source: ${parsed.data.referralSource}`);

    const message =
      extras.length > 0
        ? [parsed.data.message, "---", ...extras].filter(Boolean).join("\n")
        : parsed.data.message || null;

    // Insert into shared Railway PG leads table via Drizzle
    const db = getDb();
    await db.insert(schema.leads).values({
      clientSlug: "paragon-pools",
      name: parsed.data.name,
      email: parsed.data.email,
      message,
      ipHash: hashIp(ip),
      userAgent: request.headers.get("user-agent")?.slice(0, 500) ?? null,
      referrer: request.headers.get("referer")?.slice(0, 500) ?? null,
      pageUrl: parsed.data.sourcePage?.slice(0, 500) ?? null,
    });

    return NextResponse.json(
      { success: true },
      {
        status: 201,
        headers: { "X-RateLimit-Remaining": String(remaining) },
      }
    );
  } catch (error) {
    console.error(
      "Lead submission error:",
      error instanceof Error ? error.message : error
    );
    return NextResponse.json(
      { success: false, error: "Failed to submit lead" },
      { status: 500 }
    );
  }
}
