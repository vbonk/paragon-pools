import type { PricingTier } from "@/types/content";

export const plansPricingContent = {
  hero: {
    title: "Plans & Pricing",
    subtitle:
      "We offer maintenance plans and services tailored to your needs. Contact us for a personalized quote.",
  },

  maintenancePlans: [
    {
      name: "Basic Care",
      description: "Essential maintenance to keep your pool clean and safe.",
      priceLabel: "Contact for Pricing",
      features: [
        "Water testing & chemical balancing",
        "Skimming & debris removal",
        "Filter cleaning",
        "Equipment inspection",
        "Seasonal opening & closing",
      ],
      cta: "Get a Quote",
    },
    {
      name: "Full Service",
      description:
        "Comprehensive care so you never have to worry about your pool.",
      priceLabel: "Contact for Pricing",
      features: [
        "Everything in Basic Care, plus:",
        "Vacuuming & brushing",
        "Tile & waterline cleaning",
        "Filter backwash & cleaning",
        "Minor equipment repairs included",
        "Priority scheduling",
      ],
      highlighted: true,
      cta: "Get a Quote",
    },
    {
      name: "Premium Plus",
      description:
        "Complete pool and spa care for homeowners who want the best.",
      priceLabel: "Contact for Pricing",
      features: [
        "Everything in Full Service, plus:",
        "Hot tub / spa maintenance included",
        "Equipment replacement discounts",
        "Emergency service",
        "Annual equipment overhaul",
        "Water feature maintenance",
      ],
      cta: "Get a Quote",
    },
  ] satisfies PricingTier[],

  additionalServices: [
    { service: "Pool Opening (Seasonal)", price: "Contact for Quote" },
    { service: "Pool Closing (Winterization)", price: "Contact for Quote" },
    { service: "One-Time Cleaning & Chemical Balance", price: "Contact for Quote" },
    { service: "Equipment Diagnostic Service Call", price: "Contact for Quote" },
    { service: "Leak Detection", price: "Contact for Quote" },
    { service: "Heater Service / Repair", price: "Contact for Quote" },
    { service: "Safety Cover Install / Removal", price: "Contact for Quote" },
  ],

  constructionNote: {
    title: "Custom Pool Construction Pricing",
    text: "Every pool project is unique. Construction pricing depends on pool size, site conditions, features, and finishing options. We provide detailed, transparent quotes after an on-site consultation. Check out our packages page for complete pool package options with pricing.",
    cta: { label: "Schedule a Consultation", href: "/contact" },
  },
};
