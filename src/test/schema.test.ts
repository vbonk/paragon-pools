import { describe, it, expect } from "vitest";
import {
  generateLocalBusinessSchema,
  generateServiceSchema,
  generateBreadcrumbSchema,
  generateReviewSchema,
  generateWebsiteSchema,
} from "@/lib/schema";

describe("generateLocalBusinessSchema", () => {
  it("returns valid JSON-LD structure", () => {
    const schema = generateLocalBusinessSchema();
    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("HomeAndConstructionBusiness");
    expect(schema.name).toBe("Paragon Pool & Spa");
    expect(schema.telephone).toBe("(651) 653-6807");
    expect(schema.email).toBe("sales@paragonpoolandspa.com");
  });

  it("includes all three locations", () => {
    const schema = generateLocalBusinessSchema();
    expect(schema.address).toHaveLength(3);
  });

  it("includes opening hours", () => {
    const schema = generateLocalBusinessSchema();
    expect(schema.openingHoursSpecification).toHaveLength(2);
  });
});

describe("generateServiceSchema", () => {
  it("creates service schema with provider", () => {
    const schema = generateServiceSchema({
      name: "Pool Construction",
      description: "Custom pool building",
      url: "https://www.paragonpoolandspa.com/services",
    });
    expect(schema["@type"]).toBe("Service");
    expect(schema.name).toBe("Pool Construction");
    expect(schema.provider.name).toBe("Paragon Pool & Spa");
  });
});

describe("generateBreadcrumbSchema", () => {
  it("creates breadcrumb list", () => {
    const schema = generateBreadcrumbSchema([
      { name: "Home", url: "https://www.paragonpoolandspa.com" },
      { name: "Services", url: "https://www.paragonpoolandspa.com/services" },
    ]);
    expect(schema["@type"]).toBe("BreadcrumbList");
    expect(schema.itemListElement).toHaveLength(2);
    expect(schema.itemListElement[0].position).toBe(1);
    expect(schema.itemListElement[1].position).toBe(2);
  });
});

describe("generateReviewSchema", () => {
  it("calculates aggregate rating", () => {
    const schema = generateReviewSchema([
      { author: "Test", rating: 5, text: "Great" },
      { author: "Test2", rating: 4, text: "Good" },
    ]);
    expect(schema.aggregateRating.ratingValue).toBe("4.5");
    expect(schema.aggregateRating.reviewCount).toBe(2);
    expect(schema.review).toHaveLength(2);
  });
});

describe("generateWebsiteSchema", () => {
  it("returns website schema", () => {
    const schema = generateWebsiteSchema();
    expect(schema["@type"]).toBe("WebSite");
    expect(schema.url).toContain("paragonpoolandspa.com");
  });
});
