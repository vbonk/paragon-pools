import type { ServiceItem, TestimonialItem } from "@/types/content";

export const homeContent = {
  hero: {
    title: "Vacation in Your Own Backyard",
    subtitle:
      "Family-owned and trusted for over 35 years, Paragon Pool & Spa designs and builds stunning inground pools, spas, and saunas for Twin Cities families. Owner Mike Henry is on-site for every project.",
    cta: { label: "Get a Free Consultation", href: "/contact" },
    secondaryCta: { label: "View Our Services", href: "/services" },
  },

  intro: {
    title: "Twin Cities' Trusted Pool & Spa Experts",
    text: "Since 1990, Paragon Pool & Spa — the trade name of Paragon Pool and Patio, Inc. — has been building custom inground pools, installing hot tubs, and designing saunas for families across the Twin Cities metro area. Founded by Mike Henry, who has over 50 years of experience in pool construction since the early 1970s, Paragon earned A+ BBB accreditation in 1998 and was recognized as Builder of Excellence at the 2015 Latham Dealer Conference. With three showroom locations in Willernie, Stillwater, and Forest Lake, we offer complete pool packages with Hayward equipment, lifetime transferrable warranties, and competitive pricing starting at $51,995 for an 18x36 package.",
  },

  featuredServices: [
    {
      title: "Inground Pools",
      description:
        "Custom-designed inground pools built to fit your yard, lifestyle, and budget. From classic to contemporary designs.",
      icon: "waves",
      href: "/services",
    },
    {
      title: "Hot Tubs & Spas",
      description:
        "Premium hot tubs and spas for year-round relaxation. Browse our showroom for the perfect fit.",
      icon: "thermometer",
      href: "/products",
    },
    {
      title: "Saunas",
      description:
        "Indoor and outdoor sauna solutions. Traditional and infrared options available.",
      icon: "flame",
      href: "/products",
    },
    {
      title: "Maintenance & Service",
      description:
        "Keep your pool and spa in perfect condition with our expert maintenance and repair services.",
      icon: "wrench",
      href: "/services",
    },
  ] satisfies ServiceItem[],

  featuredTestimonials: [
    {
      author: "The Cotton Family",
      rating: 5,
      text: "What a great choice we made by selecting Paragon Pools to install our 18x36 pool package. The installation was a pain-free, noninvasive home improvement project. Mike answered all questions and addressed all concerns, returning every phone call no matter how trivial.",
      service: "18x36 Pool Installation",
    },
    {
      author: "Mark & Debby Gustafson",
      rating: 5,
      text: "You spoiled us 8 years ago and continue to spoil us today. When we needed replacement PVC tubing last week, we received it within half an hour! The friendly and responsive customer service is outstanding. We are Paragoners for life!",
      service: "Ongoing Service & Repair",
    },
    {
      author: "Irene Boyd",
      rating: 5,
      text: "Thank you, Mike Henry, for your work ethic, your honesty, your concern for others, and your respect for our budget, our needs, and our property. You have made it possible for this newly retired couple to realize the dream of a lifetime.",
      service: "Pool Construction",
    },
  ] satisfies TestimonialItem[],

  stats: [
    { value: "35+", label: "Years in Business" },
    { value: "3", label: "Showroom Locations" },
    { value: "A+", label: "BBB Rating" },
    { value: "50+", label: "Years of Expertise" },
  ],

  ctaBanner: {
    title: "Ready to Transform Your Backyard?",
    text: "Contact us today for a free consultation and estimate. Let's create your perfect outdoor oasis.",
    cta: { label: "Get Started", href: "/contact" },
    phone: "(651) 653-6807",
  },
};
