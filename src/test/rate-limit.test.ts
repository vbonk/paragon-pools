import { describe, it, expect } from "vitest";
import { rateLimit } from "@/lib/rate-limit";

describe("rateLimit", () => {
  it("allows requests within limit", () => {
    const ip = "test-" + Math.random();
    const result = rateLimit(ip, { maxRequests: 3 });
    expect(result.success).toBe(true);
    expect(result.remaining).toBe(2);
  });

  it("blocks requests exceeding limit", () => {
    const ip = "test-block-" + Math.random();
    rateLimit(ip, { maxRequests: 2 });
    rateLimit(ip, { maxRequests: 2 });
    const result = rateLimit(ip, { maxRequests: 2 });
    expect(result.success).toBe(false);
    expect(result.remaining).toBe(0);
  });

  it("uses default limits when none specified", () => {
    const ip = "test-default-" + Math.random();
    const result = rateLimit(ip);
    expect(result.success).toBe(true);
    expect(result.remaining).toBe(4); // default maxRequests is 5
  });
});
