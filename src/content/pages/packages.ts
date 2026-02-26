import type { PackageItem } from "@/types/content";

export const packagesContent = {
  hero: {
    title: "Pool Packages",
    subtitle:
      "Choose from our curated pool packages designed to give you the best value. Every package includes professional design, installation, and our quality guarantee.",
  },

  packages: [
    {
      name: "Essentials Package",
      description:
        "Everything you need for a beautiful, functional inground pool. Perfect for families looking for a quality pool without the extras.",
      features: [
        "Custom pool design consultation",
        "Standard inground pool (up to 14x28 ft)",
        "Filtration and pump system",
        "Standard coping and interior finish",
        "Basic decking (up to 200 sq ft)",
        "Safety cover included",
        "Pool school orientation",
        "1-year warranty on workmanship",
      ],
    },
    {
      name: "Premium Package",
      description:
        "Our most popular package with enhanced features and finishes for a truly stunning backyard centerpiece.",
      features: [
        "Everything in Essentials, plus:",
        "Larger pool size (up to 16x32 ft)",
        "LED color lighting system",
        "Upgraded interior finish options",
        "Enhanced decking (up to 400 sq ft)",
        "Automatic pool cleaner",
        "Energy-efficient variable speed pump",
        "Salt water chlorination system",
        "2-year warranty on workmanship",
      ],
      popular: true,
    },
    {
      name: "Ultimate Paradise Package",
      description:
        "The complete outdoor living experience. Premium pool with luxury features and custom outdoor living elements.",
      features: [
        "Everything in Premium, plus:",
        "Custom free-form or geometric design",
        "Water feature (waterfall or fountain)",
        "Integrated spa / hot tub",
        "Smart pool automation system",
        "Premium stone or paver decking",
        "Outdoor lighting package",
        "Built-in bench seating",
        "3-year warranty on workmanship",
      ],
    },
  ] satisfies PackageItem[],

  note: "All packages are customizable. Pricing depends on site conditions, design choices, and selected options. Contact us for a personalized quote.",
};
