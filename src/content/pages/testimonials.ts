import type { TestimonialItem } from "@/types/content";

export const testimonialsContent = {
  hero: {
    title: "Customer Testimonials",
    subtitle:
      "Real reviews from real families who chose Paragon Pools for their backyard projects.",
  },

  reviews: [
    {
      author: "The Cotton Family",
      text: "What a great choice we made by selecting Paragon Pools to install our 18x36 pool package. The installation was a pain-free, noninvasive home improvement project. Mike answered all questions and addressed all concerns, returning every phone call no matter how trivial. He even started the project 2 weeks early and finished in 9 days.",
      service: "18x36 Pool Installation",
    },
    {
      author: "Pat & Jane Mancini",
      text: "We love our pool and it has been great doing business with Paragon Pools. We tell everyone about you guys. We are so glad we received a referral check for the Kane's.",
      service: "Pool Installation",
    },
    {
      author: "Mark & Debby Gustafson",
      text: "You spoiled us 8 years ago and continue to spoil us today. When we needed replacement PVC tubing last week, we received it within half an hour! The friendly and responsive customer service is outstanding. We are Paragoners for life!",
      service: "Ongoing Service & Repair",
    },
    {
      author: "Don & Diane Anderson",
      text: "This is our second season and we are very pleased with the help in designing the pool every step of the way. The work crew was industrious and constantly in action. The quality of materials is superb. Would not hesitate recommending Paragon Pools to anyone considering having a pool put in.",
      service: "Pool Design & Construction",
    },
    {
      author: "Irene Boyd",
      text: "Thank you, Mike Henry, for your work ethic, your honesty, your concern for others, and your respect for our budget, our needs, and our property. You have made it possible for this newly retired couple to realize the dream of a lifetime.",
      service: "Pool Construction",
    },
    {
      author: "Wil Gayle",
      text: "Paragon Pools was very flexible with moving our start date. Once they started, the pool was installed within 2 weeks. We got the best price and Mike's no-nonsense attitude meant top quality work.",
      service: "Pool Installation",
    },
  ] satisfies TestimonialItem[],
};
