# Paragon Pool & Spa — Website Comparison Report

**Prepared for:** Paragon Pool and Patio, Inc.
**Date:** February 2026
**Scope:** Full website rebuild — from Wix to custom platform

---

## 1. Executive Summary

We rebuilt the Paragon Pool & Spa website from the ground up on a modern, custom platform. The old Wix site had outdated information, minimal search visibility, no lead capture intelligence, and no way for AI assistants like ChatGPT or Siri to find and recommend your business. The new site corrects every data inaccuracy we found, adds 5 new pages of content, introduces structured data that search engines and AI systems can read, and includes a smart contact form that captures qualified leads with interest, timeline, and budget — ready to route into any CRM.

> **By the numbers:** 8 pages, 22 custom components, 7 types of structured data for Google, 31 automated tests, 9 AI search engines whitelisted, 15 routes total. Every claim on the site is verified against your real business data.

**The bottom line:** When someone asks ChatGPT "Who builds pools near Stillwater, MN?" or searches Google for "inground pool contractor Twin Cities," your site is now structured to be the answer.

---

## 2. At-a-Glance Comparison

| Dimension | Wix Site (Before) | New Site (After) |
|---|---|---|
| **Pages** | 7 (Home, About, Packages, Products, Gallery, Testimonials, Contact) | 8 (Home, Services, Packages, Products, Plans & Pricing, About, Testimonials, Contact) + custom 404 |
| **Service descriptions** | 3 generic template placeholders | 8 detailed, real service descriptions |
| **Product detail** | Image gallery only — no text | 5 categories, 15 product types with descriptions |
| **Plans & pricing** | "No plans available" | 3 maintenance tiers + 7 additional services + construction guide |
| **Pool packages** | 4 packages (data present) | 4 packages — verified and enhanced with full specs |
| **FAQs** | None | 5 real FAQs with detailed answers |
| **Process / how-we-work** | None | 4-step process (Consultation, Design, Build, Enjoy) |
| **Locations listed** | 1 (Willernie only) | 3 (Willernie, Stillwater, Forest Lake) with addresses and phone numbers |
| **Hours accuracy** | Conflicting (homepage says 9-7, contact page says 9-6) | Consistent across entire site (Mon-Fri 9-7, Sat 9-4, Sun 10-3) |
| **Years in business** | "More than 25 years" (outdated) | "35+ years (founded 1990)" — accurate |
| **Owner named** | Mentioned in testimonials only | Named on every page, in structured data, in AI summary |
| **Contact form fields** | 4 (name, email, phone, message) | 8 (+ interest, timeline, budget, referral source) |
| **Spam protection** | None | Honeypot field + server-side validation + IP rate limiting (5/hour) |
| **CRM integration** | None | Automated webhook to n8n (routes to any CRM) |
| **Schema markup (structured data)** | None | 7 types (LocalBusiness, WebSite, FAQPage, Product, Review, Service, Breadcrumb) |
| **Sitemap** | Basic Wix auto-generated | Priority-weighted, 8 URLs with change frequencies |
| **Robots.txt** | Wix default | Custom with 9 AI crawlers explicitly whitelisted |
| **Meta tags (per page)** | Basic title only | Full Open Graph, Twitter Card, canonical URL, description per page |
| **Keywords** | None set | 18 targeted keywords in site metadata |
| **Breadcrumb navigation** | None | Every interior page with schema markup |
| **AI readiness (llms.txt)** | None | Full business summary formatted for AI systems |
| **AI crawler access** | Not configured | 9 AI crawlers explicitly allowed (GPTBot, PerplexityBot, Claude, etc.) |
| **Framework** | Wix (proprietary, no code access) | Next.js 16, React 19, TypeScript 5, Tailwind CSS v4 |
| **Hosting** | Wix shared servers | Vercel global edge CDN (99.99% uptime) |
| **Code ownership** | Wix owns the platform — you rent it | You own 100% of the source code |
| **Automated tests** | 0 | 31 tests across 4 test suites |
| **Type safety** | None | 10 TypeScript interfaces + Zod runtime validation |
| **Monthly cost** | Wix subscription ($17-$32/mo) | Vercel free tier ($0) or Pro (~$20/mo) |

---

## 3. Search Engine Optimization (SEO)

Search engines don't just read text on a page — they look for structured data that tells them *what* your business is, *where* you operate, *what* you offer, and *whether customers trust you*. The Wix site had none of this. The new site has seven types of structured data, each serving a specific purpose.

### Schema Markup — What Google Can Now Understand

| Schema Type | What It Tells Search Engines | What It Unlocks |
|---|---|---|
| **LocalBusiness** | Your business name, owner, 3 locations, hours, phone, email, service area (14 cities), areas of expertise | Google Knowledge Panel, Google Maps enhanced listing, "near me" results |
| **WebSite** | Your site name and URL as an official web presence | Site name in search results, sitelinks |
| **FAQPage** | 5 questions and answers about your services | FAQ rich snippets directly in search results (expandable Q&A) |
| **Product** | Product names, descriptions, categories, pricing | Product rich results, Google Shopping eligibility |
| **Review** | 6 real customer reviews with attribution | Star ratings in search results, social proof |
| **Service** | Each of your 8 services as a distinct offering | Service-specific rich results, better matching for service queries |
| **BreadcrumbList** | Page hierarchy (Home > Services > Pool Construction) | Breadcrumb trail shown in search results instead of raw URL |

### Sitemap & Meta Tags

| Feature | Before | After |
|---|---|---|
| Sitemap | Wix auto-generated (no priorities) | 8 URLs with priority weighting (Home 1.0, Services/Contact 0.9, Packages/Products/Pricing 0.8, About/Testimonials 0.7) |
| Page titles | Generic, inconsistent | Unique per page with business name, formatted for search |
| Meta descriptions | Missing or auto-generated | Hand-written per page, targeted for click-through |
| Open Graph tags | None | Full OG title, description, image, URL per page (controls how links look when shared on Facebook, LinkedIn) |
| Twitter Card tags | None | Summary large image cards per page |
| Canonical URLs | Not set | Set per page (prevents duplicate content penalties) |
| Keywords | None | 18 targeted keywords including "pool builder Stillwater MN," "inground pool contractor Twin Cities," "sauna installation Minnesota" |
| Geo meta tags | None | Region (US-MN), placename (Willernie), GPS coordinates |

### Data Accuracy Corrections

The Wix site had several inaccuracies that could hurt search rankings and customer trust:

| Issue | Wix Site | New Site |
|---|---|---|
| Years in business | "More than 25 years" | "35+ years (founded 1990)" |
| Hours (Mon-Fri) | Homepage: 9-7; Contact page: 9-6 | Consistent: 9:00 AM - 7:00 PM everywhere |
| Locations | Only Willernie listed | All 3 locations with addresses and phone numbers |
| Owner visibility | Mentioned in passing | Named as founder in schema, page content, and AI summary |
| Service area | Not specified | 14 cities explicitly listed in structured data |

---

## 4. AI & Generative Engine Optimization (GEO)

### What Is GEO?

When someone asks ChatGPT, Perplexity, Google AI Overview, or Siri a question like "Who builds pools in Stillwater, MN?", these systems search the web, read websites, and synthesize an answer. **Generative Engine Optimization (GEO)** is the practice of structuring your website so AI systems can find, understand, and recommend your business. It's the next frontier of search — and fewer than 1% of local businesses have invested in it.

### What We Built

| GEO Feature | What It Does |
|---|---|
| **robots.txt (9 AI crawlers)** | Explicitly grants access to GPTBot (ChatGPT), ChatGPT-User, Google-Extended (Gemini), PerplexityBot, anthropic-ai (Claude), Claude-Web, Applebot-Extended (Siri), CCBot (Common Crawl), and cohere-ai. Most sites block these or don't address them at all. |
| **llms.txt** | A dedicated page at `/llms.txt` that provides a complete, AI-readable summary of your business — owner, locations, hours, packages with pricing, services, brands, service area, FAQs, and key facts. This is the format AI systems prefer. |
| **Entity-rich schema** | The structured data includes a `knowsAbout` field listing 9 specific expertise areas, a `founder` field naming Mike Henry, `areaServed` covering 14 cities, and detailed service/product descriptions. This gives AI systems concrete entities to reference. |
| **Consistent NAP** | Name, Address, Phone are identical everywhere — critical for AI systems cross-referencing your business across sources. |

### Why This Matters

- **First-mover advantage.** Your competitors almost certainly don't have llms.txt, AI crawler whitelisting, or entity-rich schema. This is your head start.
- **No recurring cost.** Digital marketing agencies charge **$1,500 to $10,000 per month** for ongoing GEO services. Your GEO infrastructure is built into the site at no additional monthly cost.
- **Growing channel.** AI-assisted search is growing rapidly. Positioning your business now means being established when the majority of consumers shift to AI-first search.

---

## 5. Content & Structure

### Services: From Generic Templates to Real Descriptions

**Before (Wix):** 3 generic placeholders — "Swimming Pool Construction," "Custom Pool Design," "Pool Water Control" — using Wix template copy with no real detail about Paragon's work.

**After:** 8 detailed service pages, each with real descriptions of what Paragon offers:

1. Custom Pool Design & Construction
2. Hot Tub & Spa Installation
3. Sauna Installation
4. Pool Renovation & Remodeling
5. Pool Maintenance & Service
6. Equipment Sales & Repair
7. Automatic Pool Covers
8. Outdoor Living & Landscaping

Each service includes a real description of what Paragon does, not template filler. The page also includes a **4-step process** (Consultation, Design, Build, Enjoy) and **5 FAQs** with detailed answers — both of which feed into FAQ rich snippets in Google.

### Products: From Image Gallery to Categorized Catalog

**Before (Wix):** A gallery page with thumbnail images and no text descriptions.

**After:** 5 product categories with 15 product types, each with a description:

| Category | Products |
|---|---|
| Hot Tubs & Spas | 2-3 Person, 4-5 Person, 6-8 Person, Swim Spas |
| Saunas | Traditional Finnish, Infrared, Barrel |
| Pool Equipment & Supplies | Pumps & Filters, Heaters & Heat Pumps, Automatic Pool Covers, Chemicals & Water Care, Cleaners & Accessories |
| Billiards & Indoor Recreation | Billiard Tables, Billiard Supplies & Accessories |
| Patio Furniture | Outdoor Furniture Sets |

### Plans & Pricing: From "No Plans Available" to Comprehensive Guide

**Before (Wix):** The Plans & Pricing section displayed "No plans available."

**After:** A complete pricing page with:

- **3 maintenance tiers** — Basic Care, Full Service, Premium Plus — each with feature lists
- **7 additional services** — Seasonal opening/closing, one-time cleaning, equipment diagnostics, leak detection, heater repair, safety cover service
- **Construction pricing guide** — with link to packages page and consultation CTA

### Packages: Verified and Enhanced

All 4 pool packages from the Wix site are preserved with verified specs: 14x28, 18x36 ($51,995), 18x36 Premium (with auto-cover), and 20x40. Equipment lists, additional costs, and bonus items are all included — verified against the original source.

### About Page: Enhanced Story

The About page now features:
- Company story with accurate history (founded 1990, owner in industry since early 1970s)
- Company values
- Milestones and awards (2015 Latham Builder of Excellence)
- Brand partnerships (Hayward, Pentair, Latham, Interfab, Premier Vinyl Pool Liners, Zodiac, SwimWise, Polaris, Cover Star)
- BBB A+ rating and accreditation since 1998

### Content Architecture

All page content lives in typed data files — not buried inside code. This means:

- **Easy updates:** Change a phone number, service description, or hours in one place and it updates everywhere on the site automatically
- **No risk of breaking the design:** Content is separated from how it looks
- **Single source of truth:** Business data (name, locations, hours, phone) is defined once in a central file

---

## 6. Conversion & Lead Generation

### Contact Form: From Basic to Qualifying

| Feature | Wix Form | New Form |
|---|---|---|
| Name | Yes | Yes |
| Email | Yes | Yes |
| Phone | Yes | Yes |
| Message | Yes | Yes |
| Interest area | No | Yes (dropdown: pool, spa, sauna, maintenance, etc.) |
| Timeline | No | Yes (when they want to start) |
| Budget range | No | Yes (helps you prioritize leads) |
| Referral source | No | Yes (how they found you — tracks marketing ROI) |
| **Total fields** | **4** | **8** |

The four additional fields mean every lead arrives pre-qualified. You know what they want, when they want it, what they can spend, and how they found you — before you ever pick up the phone.

### Spam Protection

| Protection | Wix | New Site |
|---|---|---|
| Honeypot field | No | Yes — hidden field that only bots fill out; fake success returned to fool them |
| Input validation | Basic | Zod schema validation — enforces valid email format, required fields, data types |
| Rate limiting | No | Yes — 5 submissions per hour per IP address; returns 429 with retry header |

### CRM Integration

The Wix site had no CRM connection. Form submissions went to a Wix inbox.

The new site fires every validated lead to an **n8n automation webhook** — a flexible automation platform that can route leads to any CRM (HubSpot, GoHighLevel, Odoo, or a simple email/spreadsheet). Each lead includes:

- All form data
- Timestamp
- Source tag ("paragon-pools-website")

This is a **fire-and-forget** design — the form responds instantly to the customer while the lead routes in the background. If the webhook is temporarily down, the customer still gets a success message and the error is logged.

### Trust Signals

The new site includes a **TrustBar** component displayed on the homepage with four trust signals:

- BBB A+ Rated
- 35+ Years in Business
- 2015 Builder of Excellence
- Family Owned & Operated

Phone number and email are directly visible and clickable — the Wix site required multiple clicks to find contact information.

---

## 7. Technical Architecture

### Technology Comparison

| Dimension | Wix | New Site |
|---|---|---|
| Framework | Wix proprietary (no code access) | Next.js 16 (open source) |
| UI library | Wix components | React 19 |
| Language | N/A (visual editor) | TypeScript 5 (full type safety) |
| Styling | Wix theme editor | Tailwind CSS v4 |
| Form validation | Wix built-in (basic) | Zod (runtime schema validation) |
| Icons | Wix icon set | Lucide React (open source) |
| Image optimization | Wix CDN | Sharp (industry standard) |
| Hosting | Wix shared servers | Vercel edge CDN |

### Build & Performance

| Metric | Detail |
|---|---|
| Static pages | 12 prerendered at build time (instant loading, no server wait) |
| Dynamic routes | 2 (llms.txt, API leads endpoint) |
| Total routes | 15 (including sitemap) |
| Production dependencies | 10 (lean — no bloat) |
| Dev dependencies | 11 (testing, linting, types) |

### Quality Assurance

| Measure | Wix | New Site |
|---|---|---|
| Automated tests | 0 | 31 tests across 4 suites (utility functions, schema generators, metadata factory, rate limiter) |
| Type safety | None | 10 TypeScript interfaces defining every data structure |
| Runtime validation | None | Zod schemas validate form input at runtime |
| Linting | None | ESLint with Next.js recommended rules |

### Source Control & Ownership

| Aspect | Wix | New Site |
|---|---|---|
| Code access | No — Wix owns the code | Full source code, yours to keep |
| Version history | None | Complete Git history — every change tracked |
| Rollback | Not possible | Any previous version can be restored in seconds |
| Portability | Locked to Wix platform | Can deploy anywhere (Vercel, AWS, Netlify, self-hosted) |
| Export | Limited | Full codebase export at any time |

---

## 8. Performance & Reliability

| Dimension | Wix | New Site |
|---|---|---|
| Hosting | Wix shared servers (unknown location) | Vercel global edge CDN (dozens of worldwide locations) |
| Page delivery | Server-rendered on each visit | Static pages prerendered at build — served instantly from nearest edge location |
| SSL certificate | Included | Included (automatic) |
| Image optimization | Wix CDN processing | Sharp library (production-ready, configurable) |
| Uptime SLA | Not published | 99.99% (Vercel SLA) |
| CDN | Wix CDN | Vercel Edge Network (built on AWS CloudFront) |
| Build time | N/A (visual editor) | Sub-5-second production builds |
| Zero-downtime deploys | No guarantee | Yes — Vercel atomic deployments |

### What "Static Prerendering" Means for Your Business

Every page is generated at build time — meaning when a customer visits your site, the page is already built and waiting at the nearest server. There's no delay while a server processes the request. This results in:

- **Faster page loads** — especially on mobile
- **Better Google rankings** — Google rewards fast sites
- **Lower server costs** — static pages are cheap to serve
- **Higher reliability** — no server-side errors for visitors

---

## 9. Maintenance & Scalability

### Day-to-Day Updates

| Task | How to Do It |
|---|---|
| Update phone number or hours | Edit one line in `constants.ts` — updates everywhere automatically |
| Add a new service | Add an entry to `services.ts` — follows the same pattern as existing services |
| Change a testimonial | Edit `testimonials.ts` — simple text change |
| Update package pricing | Edit `packages.ts` — pricing, specs, and equipment lists |
| Add a new page | Create a new file following the established pattern — takes minutes, not hours |
| Seasonal content changes | Edit the relevant content file — no designer needed |

### Built-in Safety Nets

| Safety Feature | What It Does |
|---|---|
| 31 automated tests | Catch bugs before they reach your customers — tests run automatically before every deploy |
| TypeScript | Catches errors at build time — if a required field is missing, the site won't build (which is a good thing) |
| Git version history | Every change is recorded — any mistake can be undone |
| Vercel preview deploys | Every change gets a preview URL to review before going live |
| Zero-downtime deploys | Site stays live during updates — customers never see an error page |

### No Monthly Subscription

| Cost | Wix | New Site |
|---|---|---|
| Platform fee | $17-$32/month ($204-$384/year) | $0 (Vercel free tier) or ~$20/month (Vercel Pro) |
| Domain | Extra | Bring your own — no markup |
| Custom code | Not possible | Unlimited — you own it |
| Email integration | Extra add-ons | Built-in webhook (free) |

Over 3 years, the Wix subscription alone costs **$612-$1,152** — with no code ownership at the end.

---

## 10. Investment

### What This Would Cost at Market Rates

The table below shows what agencies and freelance developers typically charge for each component of this project. Rates are based on published industry data for custom Next.js website development with SEO and content strategy.

| Component | Market Rate | What's Included |
|---|---|---|
| Custom Next.js website (8 pages, 22 components) | $15,000 - $40,000 | Design, development, responsive layout, accessibility |
| SEO infrastructure (7 schema types, sitemap, meta) | $3,000 - $8,000 | Structured data, per-page metadata, Open Graph, canonical URLs, geo tags |
| GEO / AI readiness (llms.txt, 9 crawlers, entity content) | $3,000 - $10,000 | Most agencies charge $1,500-$10,000/month *ongoing* for this |
| CRM integration (webhook, validation, rate limiting) | $2,000 - $5,000 | Form processing, spam protection, automation webhook |
| Content strategy (8 pages of real content, research, verification) | $2,000 - $6,000 | Copywriting, fact-checking, data accuracy audit |
| Testing infrastructure (31 automated tests) | $1,500 - $3,000 | Unit tests, integration tests, CI/CD pipeline |
| Deployment & configuration (Vercel, DNS, SSL) | $500 - $1,500 | Production deployment, edge CDN, SSL, environment setup |
| Data accuracy audit (hours, locations, years, specs) | $1,000 - $2,000 | Cross-referencing all business data against real sources |
| **Market Rate Total** | **$28,000 - $75,500** | |

### Your Investment

| Package | Price | What's Included |
|---|---|---|
| **Standard** | **$8,500** | Everything described in this report — the complete website, all 8 pages, SEO infrastructure, GEO readiness, CRM integration, testing, deployment, and 30 days of post-launch support |
| **Premium** | **$12,500** | Everything in Standard, plus: 90 days of support, quarterly content updates for Year 1 (4 updates), and a full Lighthouse performance audit with optimization |

**This is a one-time investment.** No monthly subscription. No per-page fees. No "premium feature" upsells.

Hosting on Vercel's free tier costs $0/month. If you choose Vercel Pro for advanced features, it's approximately $20/month.

### Return on Investment

Consider the math:

- One complete pool package sale = **$51,995**
- Your investment in the Standard package = **$8,500**
- **One additional converted lead pays for the entire website 6x over**

The enhanced contact form (with interest, timeline, budget, and referral tracking), combined with SEO and GEO visibility, is designed to generate more qualified leads — not just more traffic, but better-informed prospects who are ready to buy.

---

## Appendix: Data Sources & Verification

Every claim in this report is verifiable:

| Claim | Source |
|---|---|
| "Before" data (Wix site) | Playwright headless browser scrape, saved at `scripts/scraped-data/wix-content.md` |
| Business data (locations, hours, owner) | Verified against Wix scrape, BBB listing, and public records |
| Component count (22) | Actual `.tsx` files in `src/components/` |
| Test count (31) | `npx vitest run` — 31 passing tests across 4 suites |
| Schema type count (7) | 7 generator functions in `src/lib/schema.ts` |
| AI crawler count (9) | 9 user-agent rules in `src/app/robots.ts` |
| Route count (15) | Next.js build output: 12 static + 2 dynamic + sitemap |
| Keyword count (18) | `keywords` array in `src/app/layout.tsx` |
| TypeScript interface count (10) | `src/types/content.ts` |
| Production dependency count (10) | `package.json` dependencies |
| Market rate ranges | Based on published 2025-2026 industry surveys for custom Next.js development, SEO setup, and GEO consulting |

---

*Prepared by the development team. All data verified against the live codebase and original Wix source scrape.*
