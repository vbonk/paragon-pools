import { describe, it, expect } from "vitest";
import { cn, formatPhone, slugify } from "@/lib/utils";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("handles conditional classes", () => {
    expect(cn("base", false && "hidden", "visible")).toBe("base visible");
  });

  it("resolves tailwind conflicts", () => {
    expect(cn("px-4", "px-6")).toBe("px-6");
  });
});

describe("formatPhone", () => {
  it("formats 10-digit number", () => {
    expect(formatPhone("6516536807")).toBe("(651) 653-6807");
  });

  it("formats 11-digit number with leading 1", () => {
    expect(formatPhone("16516536807")).toBe("(651) 653-6807");
  });

  it("strips non-digits before formatting", () => {
    expect(formatPhone("651-653-6807")).toBe("(651) 653-6807");
  });

  it("returns original if not 10 or 11 digits", () => {
    expect(formatPhone("123")).toBe("123");
  });
});

describe("slugify", () => {
  it("converts to lowercase kebab-case", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("removes special characters", () => {
    expect(slugify("Pool & Spa!")).toBe("pool-spa");
  });

  it("collapses multiple dashes", () => {
    expect(slugify("a---b")).toBe("a-b");
  });
});
