import type { ProductItem } from "@/types/content";

export const productsContent = {
  hero: {
    title: "Products",
    subtitle:
      "Browse our selection of premium hot tubs, saunas, pool equipment, and more. Visit our showroom to see them in person.",
  },

  categories: [
    {
      name: "Hot Tubs & Spas",
      description:
        "Relax year-round with a premium hot tub. We carry a wide selection of sizes and styles to fit any space and budget, designed to handle Minnesota winters.",
      products: [
        {
          name: "2-3 Person Hot Tubs",
          description:
            "Compact hot tubs perfect for couples or small spaces. Energy efficient and easy to maintain.",
          category: "Hot Tubs & Spas",
        },
        {
          name: "4-5 Person Hot Tubs",
          description:
            "Mid-size hot tubs ideal for families. Great jet coverage and comfortable seating for everyone.",
          category: "Hot Tubs & Spas",
        },
        {
          name: "6-8 Person Hot Tubs",
          description:
            "Full-size hot tubs for entertaining. Multiple seating configurations and powerful jet systems.",
          category: "Hot Tubs & Spas",
        },
        {
          name: "Swim Spas",
          description:
            "The best of both worlds — swim against a current for exercise, then relax in the spa section.",
          category: "Hot Tubs & Spas",
        },
      ] satisfies ProductItem[],
    },
    {
      name: "Saunas",
      description:
        "Experience the health benefits of regular sauna use. We offer traditional and infrared options for indoor and outdoor installation.",
      products: [
        {
          name: "Traditional Finnish Saunas",
          description:
            "Classic wood-fired or electric saunas with authentic Finnish design. Available in indoor and outdoor models.",
          category: "Saunas",
        },
        {
          name: "Infrared Saunas",
          description:
            "Modern infrared saunas that heat the body directly for a gentler, more efficient experience with lower operating costs.",
          category: "Saunas",
        },
        {
          name: "Barrel Saunas",
          description:
            "Distinctive barrel-shaped outdoor saunas that are both functional and beautiful. Quick assembly options available.",
          category: "Saunas",
        },
      ] satisfies ProductItem[],
    },
    {
      name: "Pool Equipment & Supplies",
      description:
        "Professional-grade equipment and supplies from industry-leading brands: Hayward, Pentair, Latham, Polaris, Cover Star, Interfab, and Zodiac.",
      products: [
        {
          name: "Pumps & Filters",
          description:
            "Variable speed pumps by Hayward and Pentair, cartridge filters, sand filters, and DE filters.",
          category: "Pool Equipment & Supplies",
        },
        {
          name: "Heaters & Heat Pumps",
          description:
            "Extend your swimming season with efficient gas heaters, heat pumps, and solar heating options.",
          category: "Pool Equipment & Supplies",
        },
        {
          name: "Automatic Pool Covers",
          description:
            "Cover Star and SwimWise automatic pool cover systems for safety, energy savings, and convenience.",
          category: "Pool Equipment & Supplies",
        },
        {
          name: "Chemicals & Water Care",
          description:
            "Complete line of pool and spa chemicals including chlorine, shock, algaecide, balancers, salt systems, and test kits.",
          category: "Pool Equipment & Supplies",
        },
        {
          name: "Cleaners & Accessories",
          description:
            "Polaris and Zodiac robotic cleaners, suction-side cleaners, and diving boards by Interfab.",
          category: "Pool Equipment & Supplies",
        },
      ] satisfies ProductItem[],
    },
    {
      name: "Billiards & Indoor Recreation",
      description:
        "More than just pools and spas — browse our selection of billiard tables and supplies for indoor entertainment.",
      products: [
        {
          name: "Billiard Tables",
          description:
            "Quality billiard and pool tables in various sizes and styles. Visit our showroom to see floor models and specials.",
          category: "Billiards & Indoor Recreation",
        },
        {
          name: "Billiard Supplies & Accessories",
          description:
            "Cues, balls, racks, felt, and everything else you need for your game room.",
          category: "Billiards & Indoor Recreation",
        },
      ] satisfies ProductItem[],
    },
    {
      name: "Patio Furniture",
      description:
        "Complete your outdoor living space with quality patio furniture. Browse our showroom selection for pieces that complement your pool area.",
      products: [
        {
          name: "Outdoor Furniture Sets",
          description:
            "Dining sets, lounge furniture, and seating groups built to withstand Minnesota weather. Floor model specials available.",
          category: "Patio Furniture",
        },
      ] satisfies ProductItem[],
    },
  ],
};
