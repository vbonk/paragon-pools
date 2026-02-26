import type { PricingTier } from "@/types/content";

export const plansPricingContent = {
  hero: {
    title: "Plans & Pricing",
    subtitle:
      "Transparent pricing for our maintenance plans and services. Custom pool construction is quoted on a per-project basis.",
  },

  maintenancePlans: [
    {
      name: "Basic Care",
      description: "Essential maintenance to keep your pool clean and safe.",
      priceLabel: "Starting at $150/month",
      features: [
        "Weekly water testing & chemical balancing",
        "Skimming & debris removal",
        "Filter cleaning (monthly)",
        "Equipment inspection",
        "Seasonal opening & closing",
      ],
      cta: "Get Started",
    },
    {
      name: "Full Service",
      description:
        "Comprehensive care so you never have to worry about your pool.",
      priceLabel: "Starting at $250/month",
      features: [
        "Everything in Basic Care, plus:",
        "Vacuuming & brushing (weekly)",
        "Tile & waterline cleaning",
        "Filter backwash & cleaning",
        "Minor equipment repairs included",
        "Priority scheduling",
        "Winter watch program",
      ],
      highlighted: true,
      cta: "Most Popular",
    },
    {
      name: "Premium Plus",
      description:
        "Complete pool and spa care for homeowners who want the best.",
      priceLabel: "Starting at $350/month",
      features: [
        "Everything in Full Service, plus:",
        "Hot tub / spa maintenance included",
        "Equipment replacement discounts",
        "24/7 emergency service line",
        "Annual equipment overhaul",
        "Water feature maintenance",
        "Dedicated service technician",
      ],
      cta: "Contact Us",
    },
  ] satisfies PricingTier[],

  additionalServices: [
    { service: "Pool Opening (Seasonal)", price: "From $300" },
    { service: "Pool Closing (Winterization)", price: "From $275" },
    { service: "One-Time Cleaning & Chemical Balance", price: "From $175" },
    { service: "Equipment Diagnostic Service Call", price: "From $125" },
    { service: "Leak Detection", price: "From $200" },
    { service: "Heater Service / Repair", price: "From $150" },
    { service: "Safety Cover Install / Removal", price: "From $200" },
  ],

  constructionNote: {
    title: "Custom Pool Construction Pricing",
    text: "Every pool project is unique. Construction pricing depends on pool size, type (gunite, vinyl, or fiberglass), site conditions, features, and finishing options. We provide detailed, transparent quotes after an on-site consultation. Most inground pool projects range from $45,000 to $120,000+.",
    cta: { label: "Schedule a Free Consultation", href: "/contact" },
  },

  financing: {
    title: "Financing Available",
    text: "Don't let budget concerns keep you from your dream pool. We partner with top financing providers to offer competitive rates, low monthly payments, and flexible terms. Ask about our financing options during your consultation.",
  },
};
