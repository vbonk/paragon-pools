export interface ServiceItem {
  title: string;
  description: string;
  icon: string;
  href?: string;
}

export interface TestimonialItem {
  author: string;
  rating?: number;
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

export interface RealPackageItem {
  name: string;
  size: string;
  price: string | null;
  poolSpecs: string[];
  equipment: string[];
  additionalCosts?: string[];
  bonuses?: string[];
}

export interface ChemicalPackage {
  name: string;
  price: string;
  items: string[];
  freeItems: string[];
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

export interface GalleryImage {
  src: string;
  alt: string;
  featured?: boolean;
  category?: string;
}

export interface GalleryContent {
  hero: {
    title: string;
    subtitle: string;
  };
  images: GalleryImage[];
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  tags?: string[];
  sections: { heading: string; content: string }[];
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
