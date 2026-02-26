export const COMPANY = {
  name: "Paragon Pool & Spa",
  legalName: "Paragon Pool and Patio, Inc.",
  tagline: "Vacation in Your Own Backyard",
  description:
    "Family-owned pool, spa, and sauna specialists serving the Twin Cities metro area for over 35 years. Expert design, installation, and maintenance.",
  owner: "Mike Henry",
  phone: "(651) 653-6807",
  phoneRaw: "+16516536807",
  email: "sales@paragonpoolandspa.com",
  url: "https://www.paragonpoolandspa.com",
  foundedYear: 1990,
  yearsInBusiness: 35,
  bbbRating: "A+",

  locations: [
    {
      name: "Willernie Showroom",
      street: "305 Stillwater Road",
      city: "Willernie",
      state: "MN",
      zip: "55090",
      phone: "(651) 653-6807",
      lat: 45.0575,
      lng: -92.9581,
    },
    {
      name: "Stillwater Location",
      street: "1280 Frontage Rd W",
      city: "Stillwater",
      state: "MN",
      zip: "55082",
      phone: "(651) 439-5632",
      lat: 45.0541,
      lng: -92.8310,
    },
    {
      name: "Forest Lake Location",
      street: "1148 W Broadway Ave",
      city: "Forest Lake",
      state: "MN",
      zip: "55025",
      phone: "(651) 464-4401",
      lat: 45.2788,
      lng: -93.0074,
    },
  ],

  hours: {
    monday: "9:00 AM - 7:00 PM",
    tuesday: "9:00 AM - 7:00 PM",
    wednesday: "9:00 AM - 7:00 PM",
    thursday: "9:00 AM - 7:00 PM",
    friday: "9:00 AM - 7:00 PM",
    saturday: "9:00 AM - 4:00 PM",
    sunday: "10:00 AM - 3:00 PM",
  },

  fax: "(651) 653-6808",

  social: {
    facebook: "https://www.facebook.com/paragonpoolandspa",
  },

  serviceArea: [
    "Mahtomedi",
    "Willernie",
    "White Bear Lake",
    "Stillwater",
    "Forest Lake",
    "Woodbury",
    "Maplewood",
    "North St. Paul",
    "Oakdale",
    "Lake Elmo",
    "Hugo",
    "Blaine",
    "Minnetonka",
    "Twin Cities Metro",
  ],
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/packages", label: "Packages" },
  { href: "/products", label: "Products" },
  { href: "/plans-pricing", label: "Plans & Pricing" },
  { href: "/about", label: "About" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
] as const;
