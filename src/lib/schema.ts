import { COMPANY } from "./constants";

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: COMPANY.name,
    description: COMPANY.description,
    url: COMPANY.url,
    telephone: COMPANY.phone,
    email: COMPANY.email,
    foundingDate: String(COMPANY.foundedYear),
    image: `${COMPANY.url}/og-image.jpg`,
    priceRange: "$$",
    areaServed: COMPANY.serviceArea.map((city) => ({
      "@type": "City",
      name: city,
      containedInPlace: { "@type": "State", name: "Minnesota" },
    })),
    address: COMPANY.locations.map((loc) => ({
      "@type": "PostalAddress",
      streetAddress: loc.street,
      addressLocality: loc.city,
      addressRegion: loc.state,
      postalCode: loc.zip,
      addressCountry: "US",
    })),
    geo: COMPANY.locations.map((loc) => ({
      "@type": "GeoCoordinates",
      latitude: loc.lat,
      longitude: loc.lng,
    })),
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "10:00", closes: "16:00" },
    ],
    sameAs: Object.values(COMPANY.social),
  };
}

export function generateServiceSchema(service: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: service.url,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: COMPANY.name,
      url: COMPANY.url,
    },
    areaServed: {
      "@type": "State",
      name: "Minnesota",
    },
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateReviewSchema(reviews: {
  author: string;
  rating: number;
  text: string;
  date?: string;
}[]) {
  const avgRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: COMPANY.name,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avgRating.toFixed(1),
      reviewCount: reviews.length,
      bestRating: "5",
      worstRating: "1",
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: "5",
      },
      reviewBody: r.text,
      ...(r.date && { datePublished: r.date }),
    })),
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: COMPANY.name,
    url: COMPANY.url,
  };
}
