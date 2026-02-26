import type { TeamMember } from "@/types/content";

export const aboutContent = {
  hero: {
    title: "About Paragon Pool & Spa",
    subtitle:
      "A family-owned business dedicated to creating beautiful outdoor spaces for Twin Cities families since 1990.",
  },

  story: {
    title: "Our Story",
    paragraphs: [
      "Mike Henry began his career in the pool industry as a laborer in the early 1970s, working for a large pool company. Over the years, he immersed himself in every stage of pool construction — from excavation to finishing — gaining hands-on expertise that would become the foundation of his business.",
      "After working his way up and developing deep knowledge of pool design and sales, Mike branched out on his own and founded Paragon Pool and Patio, Inc. on April 1, 1990. His vision was simple: provide homeowners with well-built, private pools backed by honest service and competitive pricing.",
      "Today, more than 35 years later, Paragon Pool & Spa operates three locations across the Twin Cities east metro — in Willernie, Stillwater, and Forest Lake. Mike is still on-site for every job, supervising to ensure everything goes according to plan. That hands-on commitment is what sets Paragon apart.",
      "From custom inground pools and hot tubs to saunas, patio furniture, and even billiard tables, Paragon is your one-stop shop for backyard entertainment. We use only the highest quality products at the most competitive prices, building long-lasting pools that keep families entertained for years to come.",
    ],
  },

  values: [
    {
      title: "Owner On-Site",
      description:
        "Mike Henry personally supervises every project, ensuring quality and attention to detail from start to finish.",
    },
    {
      title: "Family Values",
      description:
        "As a family-owned and operated business, we treat your property with the same care we'd give our own.",
    },
    {
      title: "Quality Products",
      description:
        "We partner with industry-leading brands like Hayward, Pentair, Latham, and Polaris to deliver the best results.",
    },
    {
      title: "Competitive Pricing",
      description:
        "Top-quality materials and expert craftsmanship at fair, competitive prices. Free in-home estimates available.",
    },
  ],

  team: [
    {
      name: "Mike Henry",
      role: "President & Founder",
      bio: "With over 50 years in the pool industry, Mike has been on-site for every Paragon project since founding the company in 1990. His hands-on approach and commitment to quality define the Paragon experience.",
    },
    {
      name: "Design & Sales Team",
      role: "Project Specialists",
      bio: "Our design team works closely with homeowners to create custom pool, spa, and outdoor living spaces that match their vision and budget.",
    },
    {
      name: "Service Technicians",
      role: "Maintenance & Repair",
      bio: "Our certified service technicians keep your pool and spa running smoothly with expert maintenance, repairs, and seasonal services.",
    },
  ] satisfies TeamMember[],

  milestones: [
    { year: "1970s", event: "Mike Henry begins career in pool construction as a laborer" },
    { year: "1990", event: "Paragon Pool and Patio, Inc. founded on April 1st" },
    { year: "1998", event: "Accredited by the Better Business Bureau (A+ rating)" },
    { year: "2005", event: "Expanded operations with second showroom location" },
    { year: "2015", event: "Added sauna and expanded product lines" },
    { year: "2020", event: "Celebrated 30 years serving the Twin Cities" },
    { year: "2025", event: "Three locations serving the east metro and beyond" },
  ],

  brands: [
    "Hayward",
    "Pentair",
    "Latham",
    "Polaris",
    "Cover Star",
    "S.R. Smith",
    "Interfab",
    "Zodiac",
    "SwimWise",
  ],
};
