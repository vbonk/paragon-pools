import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";

const leadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  interest: z.string().optional(),
  timeline: z.string().optional(),
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

    // Append extra fields to message
    const extras: string[] = [];
    if (raw.interest) {
      extras.push(`Interest: ${raw.interest}`);
    }
    if (raw.timeline) {
      extras.push(`Timeline: ${raw.timeline}`);
    }

    if (extras.length > 0) {
      raw.message = [raw.message, "---", ...extras].filter(Boolean).join("\n");
    }

    // Validate
    const parsed = leadSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // Fire-and-forget n8n webhook
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (webhookUrl) {
      fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...parsed.data,
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
