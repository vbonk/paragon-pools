import type { Metadata } from "next";
import { COMPANY } from "./constants";

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
}

export function createMetadata({
  title,
  description,
  path,
  image = "/og-image.jpg",
}: PageMetadataOptions): Metadata {
  const url = `${COMPANY.url}${path}`;
  const fullTitle = path === "/" ? `${COMPANY.name} | ${title}` : `${title} | ${COMPANY.name}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: COMPANY.name,
      locale: "en_US",
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
