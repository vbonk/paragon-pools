import type { TeamMember } from "@/types/content";

export const aboutContent = {
  hero: {
    title: "About Paragon Pool & Spa",
    subtitle:
      "Family-owned since 1990, BBB A+ accredited since 1998, and recognized as a 2015 Latham Builder of Excellence. Owner Mike Henry has over 50 years of pool industry experience.",
  },

  story: {
    title: "Our Story",
    paragraphs: [
      "Mike Henry began his career in the pool industry as a laborer in the early 1970s, working for a large pool company. Over the years, he immersed himself in every stage of pool construction — from excavation to finishing — gaining hands-on expertise that would become the foundation of his business.",
      "After working his way up and developing deep knowledge of pool design and sales, Mike branched out on his own and founded Paragon Pool and Patio, Inc. in 1990. His vision was simple: provide homeowners with well-built, private pools backed by honest service and competitive pricing.",
      "Today, more than 35 years later, Paragon Pool & Spa continues to serve the Twin Cities east metro. Mike is still on-site for every job, supervising to ensure everything goes according to plan. That hands-on commitment is what sets Paragon apart.",
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
        "Top-quality materials and expert craftsmanship at fair, competitive prices.",
    },
  ],

  team: [
    {
      name: "Mike Henry",
      role: "President & Founder",
      bio: "Mike has been in the pool industry since the early 1970s and has been on-site for every Paragon project since founding the company in 1990. His hands-on approach and commitment to quality define the Paragon experience.",
    },
  ] satisfies TeamMember[],

  milestones: [
    { year: "1970s", event: "Mike Henry begins career in pool construction as a laborer" },
    { year: "1990", event: "Paragon Pool and Patio, Inc. founded" },
    { year: "2015", event: "Recognized at Latham Dealer Conference as Builder of Excellence" },
  ],

  brands: [
    "Hayward",
    "Pentair",
    "Latham",
    "Interfab",
    "Premier Vinyl Pool Liners",
    "Zodiac",
    "SwimWise",
    "Polaris",
    "Cover Star",
  ],
};
