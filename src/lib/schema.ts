import { COMPANY } from "./constants";
import type { FAQItem } from "@/types/content";

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
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "19:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "16:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "10:00", closes: "15:00" },
    ],
    sameAs: Object.values(COMPANY.social),
    knowsAbout: [
      "Inground pool construction",
      "Hot tub installation",
      "Sauna installation",
      "Pool renovation",
      "Automatic pool covers",
      "Pool maintenance",
      "Vinyl pool liners",
      "Hayward pool equipment",
      "Pentair salt systems",
    ],
    founder: {
      "@type": "Person",
      name: COMPANY.owner,
      jobTitle: "President & Founder",
    },
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
  rating?: number;
  text: string;
  date?: string;
}[]) {
  const ratedReviews = reviews.filter((r) => r.rating != null);
  const hasRatings = ratedReviews.length > 0;

  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: COMPANY.name,
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewBody: r.text,
      ...(r.date && { datePublished: r.date }),
      ...(r.rating != null && {
        reviewRating: {
          "@type": "Rating",
          ratingValue: r.rating,
          bestRating: 5,
        },
      }),
    })),
    ...(hasRatings && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue:
          ratedReviews.reduce((sum, r) => sum + r.rating!, 0) /
          ratedReviews.length,
        reviewCount: ratedReviews.length,
        bestRating: 5,
      },
    }),
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

export function generateFAQPageSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateProductSchema(product: {
  name: string;
  description: string;
  price?: number;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    url: product.url,
    brand: {
      "@type": "Brand",
      name: COMPANY.name,
    },
    ...(product.price && {
      offers: {
        "@type": "Offer",
        price: product.price,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "HomeAndConstructionBusiness",
          name: COMPANY.name,
          url: COMPANY.url,
        },
      },
    }),
  };
}

export function generateHowToSchema(howTo: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: howTo.name,
    description: howTo.description,
    step: howTo.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

export function generateContactPointSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: COMPANY.name,
    url: COMPANY.url,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: COMPANY.phone,
      email: COMPANY.email,
      contactType: "sales",
      areaServed: {
        "@type": "State",
        name: "Minnesota",
      },
      availableLanguage: "English",
    },
  };
}

export function generateArticleSchema(article: {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  url: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: COMPANY.name,
      url: COMPANY.url,
    },
    datePublished: article.datePublished,
    ...(article.dateModified && { dateModified: article.dateModified }),
    mainEntityOfPage: article.url,
    ...(article.image && {
      image: {
        "@type": "ImageObject",
        url: article.image,
      },
    }),
  };
}
