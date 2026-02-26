import { describe, it, expect } from "vitest";
import { createMetadata } from "@/lib/metadata";

describe("createMetadata", () => {
  it("creates metadata for the home page", () => {
    const meta = createMetadata({
      title: "Pool & Spa Experts",
      description: "Test description",
      path: "/",
    });

    expect(meta.title).toContain("Paragon Pool & Spa");
    expect(meta.description).toBe("Test description");
    expect(meta.alternates?.canonical).toBe(
      "https://www.paragonpoolandspa.com/"
    );
  });

  it("creates metadata for interior pages", () => {
    const meta = createMetadata({
      title: "Services",
      description: "Our services",
      path: "/services",
    });

    expect(meta.title).toBe("Services | Paragon Pool & Spa");
    expect(meta.alternates?.canonical).toBe(
      "https://www.paragonpoolandspa.com/services"
    );
  });

  it("includes Open Graph data", () => {
    const meta = createMetadata({
      title: "About",
      description: "About us",
      path: "/about",
    });

    expect(meta.openGraph?.title).toContain("About");
    expect(meta.openGraph?.siteName).toBe("Paragon Pool & Spa");
  });
});
