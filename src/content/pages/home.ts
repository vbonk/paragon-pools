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
    text: "Since 1990, Paragon Pool & Spa has been transforming backyards across the Twin Cities metro area. From custom inground pools to relaxing hot tubs and saunas, we bring your outdoor living dreams to life with expert craftsmanship, honest communication, and competitive pricing. With three showroom locations and an A+ BBB rating, we make it easy to get started.",
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
      author: "Sarah M.",
      rating: 5,
      text: "Paragon built our dream pool and the entire experience was fantastic. Professional from start to finish. Our family enjoys it every summer!",
      location: "White Bear Lake, MN",
    },
    {
      author: "Tom & Linda K.",
      rating: 5,
      text: "We've been customers for over 15 years. Their maintenance service is reliable and their team truly cares about quality. Highly recommend!",
      location: "Mahtomedi, MN",
    },
    {
      author: "Dave R.",
      rating: 5,
      text: "The hot tub we purchased from Paragon has been perfect. Great selection, knowledgeable staff, and excellent follow-up service.",
      location: "Stillwater, MN",
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
