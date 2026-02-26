export interface ServiceItem {
  title: string;
  description: string;
  icon: string;
  href?: string;
}

export interface TestimonialItem {
  author: string;
  rating: number;
  text: string;
  date?: string;
  location?: string;
  service?: string;
}

export interface PackageItem {
  name: string;
  description: string;
  features: string[];
  popular?: boolean;
  href?: string;
}

export interface PricingTier {
  name: string;
  description: string;
  priceLabel: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

export interface ProductItem {
  name: string;
  description: string;
  category: string;
  image?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  image?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PageContent {
  hero?: {
    title: string;
    subtitle?: string;
    cta?: { label: string; href: string };
    secondaryCta?: { label: string; href: string };
  };
  sections: {
    id: string;
    title: string;
    subtitle?: string;
    content?: string;
  }[];
}
