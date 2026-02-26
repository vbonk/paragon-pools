import { describe, it, expect } from "vitest";
import {
  generateLocalBusinessSchema,
  generateServiceSchema,
  generateBreadcrumbSchema,
  generateReviewSchema,
  generateWebsiteSchema,
  generateFAQPageSchema,
  generateProductSchema,
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

  it("includes opening hours with Sunday", () => {
    const schema = generateLocalBusinessSchema();
    expect(schema.openingHoursSpecification).toHaveLength(3);
    const sunday = schema.openingHoursSpecification[2];
    expect(sunday.dayOfWeek).toBe("Sunday");
    expect(sunday.opens).toBe("10:00");
    expect(sunday.closes).toBe("15:00");
  });

  it("has correct weekday hours (9-7)", () => {
    const schema = generateLocalBusinessSchema();
    const weekdays = schema.openingHoursSpecification[0];
    expect(weekdays.opens).toBe("09:00");
    expect(weekdays.closes).toBe("19:00");
  });

  it("has correct Saturday hours (9-4)", () => {
    const schema = generateLocalBusinessSchema();
    const saturday = schema.openingHoursSpecification[1];
    expect(saturday.opens).toBe("09:00");
    expect(saturday.closes).toBe("16:00");
  });

  it("includes founder information", () => {
    const schema = generateLocalBusinessSchema();
    expect(schema.founder).toBeDefined();
    expect(schema.founder.name).toBe("Mike Henry");
  });

  it("does not include fax number", () => {
    const schema = generateLocalBusinessSchema();
    expect(schema).not.toHaveProperty("faxNumber");
  });

  it("includes knowsAbout topics", () => {
    const schema = generateLocalBusinessSchema();
    expect(schema.knowsAbout).toBeDefined();
    expect(schema.knowsAbout.length).toBeGreaterThan(0);
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
  it("generates review schema without aggregate rating", () => {
    const schema = generateReviewSchema([
      { author: "Test", text: "Great" },
      { author: "Test2", text: "Good" },
    ]);
    expect(schema).not.toHaveProperty("aggregateRating");
    expect(schema.review).toHaveLength(2);
    expect(schema.review[0].reviewBody).toBe("Great");
    expect(schema.review[0].author.name).toBe("Test");
  });
});

describe("generateWebsiteSchema", () => {
  it("returns website schema", () => {
    const schema = generateWebsiteSchema();
    expect(schema["@type"]).toBe("WebSite");
    expect(schema.url).toContain("paragonpoolandspa.com");
  });
});

describe("generateFAQPageSchema", () => {
  it("creates FAQ schema with questions and answers", () => {
    const schema = generateFAQPageSchema([
      { question: "How long does it take?", answer: "6-10 weeks typically." },
      { question: "What types of pools?", answer: "Gunite, vinyl, fiberglass." },
    ]);
    expect(schema["@type"]).toBe("FAQPage");
    expect(schema.mainEntity).toHaveLength(2);
    expect(schema.mainEntity[0]["@type"]).toBe("Question");
    expect(schema.mainEntity[0].name).toBe("How long does it take?");
    expect(schema.mainEntity[0].acceptedAnswer["@type"]).toBe("Answer");
  });
});

describe("generateProductSchema", () => {
  it("creates product schema with price", () => {
    const schema = generateProductSchema({
      name: "18x36 Pool Package",
      description: "Complete pool package",
      price: 51995,
      url: "https://www.paragonpoolandspa.com/packages",
    });
    expect(schema["@type"]).toBe("Product");
    expect(schema.name).toBe("18x36 Pool Package");
    expect(schema.offers?.price).toBe(51995);
    expect(schema.offers?.priceCurrency).toBe("USD");
  });

  it("creates product schema without price", () => {
    const schema = generateProductSchema({
      name: "14x28 Pool Package",
      description: "Complete pool package",
      url: "https://www.paragonpoolandspa.com/packages",
    });
    expect(schema["@type"]).toBe("Product");
    expect(schema.offers).toBeUndefined();
  });
});
