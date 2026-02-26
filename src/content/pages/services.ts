import type { ServiceItem, FAQItem } from "@/types/content";

export const servicesContent = {
  hero: {
    title: "Our Services",
    subtitle:
      "From design to installation to ongoing maintenance, Paragon Pool & Spa provides comprehensive pool and spa services for the Twin Cities metro area.",
  },

  services: [
    {
      title: "Custom Pool Design & Construction",
      description:
        "We work with you from concept to completion to design and build the perfect inground pool. Our team handles design consultation, permits, excavation, construction, and finishing. Choose from gunite (concrete), vinyl liner, or fiberglass options tailored to your space and style.",
      icon: "pen-tool",
    },
    {
      title: "Hot Tub & Spa Installation",
      description:
        "Browse our showroom collection of premium hot tubs and spas. We handle delivery, placement, electrical coordination, and setup. We carry top brands designed for Minnesota's climate for year-round enjoyment.",
      icon: "thermometer",
    },
    {
      title: "Sauna Installation",
      description:
        "Create your personal wellness retreat with a custom sauna. We offer both traditional Finnish and infrared sauna options for indoor or outdoor installation — perfect for year-round use in Minnesota.",
      icon: "flame",
    },
    {
      title: "Pool Renovation & Remodeling",
      description:
        "Give your existing pool new life with our renovation services. From resurfacing and vinyl liner replacement to complete redesigns with new features like waterfalls, lighting, and automation systems.",
      icon: "refresh-cw",
    },
    {
      title: "Pool Maintenance & Service",
      description:
        "Keep your pool crystal clear with our professional maintenance plans. We offer weekly service including water testing, chemical balancing, salt system adjustment, seasonal opening and closing, and equipment repair.",
      icon: "wrench",
    },
    {
      title: "Equipment Sales & Repair",
      description:
        "We stock a full range of pool and spa equipment including Hayward pumps, Pentair filters, heaters, Polaris cleaners, Cover Star automatic covers, and chemicals. Our technicians diagnose and repair any equipment issue.",
      icon: "settings",
    },
    {
      title: "Automatic Pool Covers",
      description:
        "Protect your pool with a Cover Star or SwimWise automatic pool cover. We handle installation, maintenance, and repair of automatic cover systems for safety and energy savings.",
      icon: "waves",
    },
    {
      title: "Outdoor Living & Landscaping",
      description:
        "Complete your backyard transformation with integrated outdoor living spaces. We coordinate patios, concrete work, decking, landscaping, fencing, and lighting to complement your pool or spa.",
      icon: "sun",
    },
  ] satisfies ServiceItem[],

  process: [
    {
      step: 1,
      title: "Consultation",
      description:
        "We meet at your home for a free estimate. We discuss your vision, assess your yard, and understand your budget and timeline.",
    },
    {
      step: 2,
      title: "Design",
      description:
        "Our team creates a custom plan tailored to your property and preferences. We work with you on every detail until it's perfect.",
    },
    {
      step: 3,
      title: "Build",
      description:
        "Mike Henry supervises every project on-site. Our experienced crew brings the design to life with quality materials and expert craftsmanship.",
    },
    {
      step: 4,
      title: "Enjoy",
      description:
        "We walk you through everything, provide maintenance training, and ensure you're completely satisfied. Our service team is always just a call away.",
    },
  ],

  faqs: [
    {
      question: "How long does it take to build an inground pool?",
      answer:
        "A typical inground pool installation takes 6-10 weeks depending on the complexity of the design, weather conditions, and permitting. We provide a detailed timeline during the design phase and Mike stays true to his word on start and completion dates.",
    },
    {
      question: "What types of pools do you install?",
      answer:
        "We install gunite (concrete), vinyl liner, and fiberglass pools. Each type has its advantages, and we help you choose the best option for your needs, budget, and property during the free consultation.",
    },
    {
      question: "Do you offer financing?",
      answer:
        "Yes, we partner with financing providers to offer competitive rates and flexible terms. Ask about financing options during your in-home consultation.",
    },
    {
      question: "Can you work on an existing pool?",
      answer:
        "Absolutely. We offer full renovation services including resurfacing, liner replacement, re-tiling, equipment upgrades, adding features, and complete remodels of existing pools.",
    },
    {
      question: "What maintenance services do you offer?",
      answer:
        "We provide weekly maintenance plans including water testing, chemical balancing, and salt system adjustment. We also offer seasonal opening and closing, equipment repair, and one-time service calls.",
    },
    {
      question: "Do you sell above-ground pools?",
      answer:
        "Yes, in addition to custom inground pools, we also sell and install above-ground pools. Visit our showroom or contact us to learn about available options.",
    },
  ] satisfies FAQItem[],
};
