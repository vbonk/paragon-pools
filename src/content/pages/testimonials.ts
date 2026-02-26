import type { TestimonialItem } from "@/types/content";

export const testimonialsContent = {
  hero: {
    title: "Customer Testimonials",
    subtitle:
      "Don't just take our word for it. Hear from the families who trust Paragon Pool & Spa for their outdoor living needs.",
  },

  reviews: [
    {
      author: "Long-Time Customer",
      rating: 5,
      text: "You spoiled us 8 years ago and continue to spoil us today. The friendly and responsive customer service is outstanding. We are Paragoners for life!",
      location: "Twin Cities, MN",
      service: "Pool Maintenance",
    },
    {
      author: "Retired Couple",
      rating: 5,
      text: "Thank you, Mike Henry, for your work ethic, your honesty, your concern for others, and your respect for our budget, our needs, and our property. You have made it possible for this newly retired couple to realize the dream of a lifetime.",
      location: "Twin Cities, MN",
      service: "Pool Construction",
    },
    {
      author: "New Pool Owner",
      rating: 5,
      text: "We were pleased with help in designing the pool every step of the way. The work crew was industrious and constantly in action. The quality of materials is superb. Would not hesitate recommending Paragon Pools to anyone considering having a pool put in.",
      location: "Twin Cities, MN",
      service: "Pool Design & Construction",
    },
    {
      author: "Satisfied Homeowner",
      rating: 5,
      text: "Mike answered all questions and addressed all concerns, returning every phone call no matter how trivial. The installation was a pain-free, noninvasive home improvement project. Couldn't be happier with the result.",
      location: "Twin Cities, MN",
      service: "Pool Installation",
    },
    {
      author: "Pool Remodel Customer",
      rating: 5,
      text: "We chose Paragon because of Mike's knowledge and competitive pricing. Mike stayed true to his word on start and completion dates. The remodel transformed our aging pool into something beautiful.",
      location: "Twin Cities, MN",
      service: "Pool Renovation",
    },
    {
      author: "Recent Customer",
      rating: 5,
      text: "From initial consultation to completion and post-completion follow-up, their service is top notch. Technicians take time to explain operations of components and set up app connectivity. The team did a great job, our pool turned out amazing!",
      location: "Twin Cities, MN",
      service: "Pool Construction",
    },
    {
      author: "Loyal Customer",
      rating: 5,
      text: "After 8 years, we needed replacement PVC tubing and received it within half an hour. That's the kind of responsive service you get with Paragon. They stand behind their work long after the installation is complete.",
      location: "Twin Cities, MN",
      service: "Service & Repair",
    },
    {
      author: "Happy Family",
      rating: 5,
      text: "Installation went well and Paragon Pools was very flexible and easy to work with. We also received wonderful referral benefits. The whole experience from start to finish was professional and enjoyable.",
      location: "Twin Cities, MN",
      service: "Pool Installation",
    },
  ] satisfies TestimonialItem[],

  summary: {
    averageRating: 4.9,
    totalReviews: 150,
    recommendation: 98,
  },
};
