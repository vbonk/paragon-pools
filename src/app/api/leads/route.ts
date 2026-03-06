import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";

const leadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  interest: z.string().optional(),
  timeline: z.string().optional(),
  budget: z.string().optional(),
  referralSource: z.string().optional(),
  message: z.string().optional(),
  sourcePage: z.string().optional(),
});

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

    // Append extra fields to message (operating on validated data)
    const extras: string[] = [];
    if (parsed.data.interest) {
      extras.push(`Interest: ${parsed.data.interest}`);
    }
    if (parsed.data.timeline) {
      extras.push(`Timeline: ${parsed.data.timeline}`);
    }
    if (parsed.data.budget) {
      extras.push(`Budget: ${parsed.data.budget}`);
    }
    if (parsed.data.referralSource) {
      extras.push(`Referral Source: ${parsed.data.referralSource}`);
    }

    const message = extras.length > 0
      ? [parsed.data.message, "---", ...extras].filter(Boolean).join("\n")
      : parsed.data.message;

    // Fire-and-forget n8n webhook
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (webhookUrl) {
      fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...parsed.data,
          message,
          source: "paragon-pools-website",
          timestamp: new Date().toISOString(),
        }),
      }).catch((err) => console.error("n8n webhook error:", err));
    }

    return NextResponse.json(
      { success: true },
      {
        status: 201,
        headers: { "X-RateLimit-Remaining": String(remaining) },
      }
    );
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit lead" },
      { status: 500 }
    );
  }
}
