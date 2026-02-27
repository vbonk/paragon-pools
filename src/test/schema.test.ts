import { describe, it, expect } from "vitest";
import {
  generateLocalBusinessSchema,
  generateServiceSchema,
  generateBreadcrumbSchema,
  generateReviewSchema,
  generateWebsiteSchema,
  generateFAQPageSchema,
  generateProductSchema,
  generateHowToSchema,
  generateContactPointSchema,
  generateArticleSchema,
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
  it("generates review schema without aggregate rating when no ratings", () => {
    const schema = generateReviewSchema([
      { author: "Test", text: "Great" },
      { author: "Test2", text: "Good" },
    ]);
    expect(schema).not.toHaveProperty("aggregateRating");
    expect(schema.review).toHaveLength(2);
    expect(schema.review[0].reviewBody).toBe("Great");
    expect(schema.review[0].author.name).toBe("Test");
    expect(schema.review[0]).not.toHaveProperty("reviewRating");
  });

  it("includes reviewRating and aggregateRating when ratings provided", () => {
    const schema = generateReviewSchema([
      { author: "Alice", rating: 5, text: "Amazing!" },
      { author: "Bob", rating: 4, text: "Good work" },
      { author: "Carol", text: "Nice" },
    ]);
    expect(schema.review[0].reviewRating).toEqual({
      "@type": "Rating",
      ratingValue: 5,
      bestRating: 5,
    });
    expect(schema.review[1].reviewRating.ratingValue).toBe(4);
    expect(schema.review[2]).not.toHaveProperty("reviewRating");
    expect(schema.aggregateRating).toEqual({
      "@type": "AggregateRating",
      ratingValue: 4.5,
      reviewCount: 2,
      bestRating: 5,
    });
  });

  it("computes correct aggregate for all 5-star reviews", () => {
    const schema = generateReviewSchema([
      { author: "A", rating: 5, text: "Great" },
      { author: "B", rating: 5, text: "Great" },
      { author: "C", rating: 5, text: "Great" },
    ]);
    expect(schema.aggregateRating.ratingValue).toBe(5);
    expect(schema.aggregateRating.reviewCount).toBe(3);
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

describe("generateHowToSchema", () => {
  it("creates HowTo schema with numbered steps", () => {
    const schema = generateHowToSchema({
      name: "How to Build a Pool",
      description: "Step-by-step pool building process",
      steps: [
        { name: "Consultation", text: "Meet to discuss vision" },
        { name: "Design", text: "Create custom plan" },
        { name: "Build", text: "Construct the pool" },
      ],
    });
    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("HowTo");
    expect(schema.name).toBe("How to Build a Pool");
    expect(schema.step).toHaveLength(3);
    expect(schema.step[0]["@type"]).toBe("HowToStep");
    expect(schema.step[0].position).toBe(1);
    expect(schema.step[0].name).toBe("Consultation");
    expect(schema.step[2].position).toBe(3);
  });
});

describe("generateContactPointSchema", () => {
  it("creates ContactPoint schema with phone and email", () => {
    const schema = generateContactPointSchema();
    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("HomeAndConstructionBusiness");
    expect(schema.contactPoint["@type"]).toBe("ContactPoint");
    expect(schema.contactPoint.telephone).toBe("(651) 653-6807");
    expect(schema.contactPoint.email).toBe("sales@paragonpoolandspa.com");
    expect(schema.contactPoint.contactType).toBe("sales");
    expect(schema.contactPoint.areaServed).toEqual({
      "@type": "State",
      name: "Minnesota",
    });
  });
});

describe("generateArticleSchema", () => {
  it("creates Article schema with required fields", () => {
    const schema = generateArticleSchema({
      title: "How Much Does a Pool Cost?",
      description: "A guide to pool costs",
      author: "Mike Henry",
      datePublished: "2026-01-15",
      url: "https://www.paragonpoolandspa.com/blog/pool-cost",
    });
    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("Article");
    expect(schema.headline).toBe("How Much Does a Pool Cost?");
    expect(schema.author.name).toBe("Mike Henry");
    expect(schema.publisher.name).toBe("Paragon Pool & Spa");
    expect(schema.datePublished).toBe("2026-01-15");
    expect(schema).not.toHaveProperty("dateModified");
    expect(schema).not.toHaveProperty("image");
  });

  it("includes optional dateModified and image", () => {
    const schema = generateArticleSchema({
      title: "Test Article",
      description: "Test",
      author: "Author",
      datePublished: "2026-01-01",
      dateModified: "2026-02-01",
      url: "https://example.com/test",
      image: "https://example.com/img.jpg",
    });
    expect(schema.dateModified).toBe("2026-02-01");
    expect(schema.image).toEqual({
      "@type": "ImageObject",
      url: "https://example.com/img.jpg",
    });
  });
});
