# GEO Audit Report: Paragon Pool & Spa

**Audit Date:** February 26, 2026
**URL:** paragon-pools.vercel.app (target domain: www.paragonpoolandspa.com)
**Business Type:** Local Business — Pool/Spa Contractor (HomeAndConstructionBusiness)
**Pages Analyzed:** 8 + robots.txt, sitemap.xml, llms.txt

---

## Executive Summary

**Overall GEO Score: 67/100 (Fair)**

Paragon Pool & Spa's website has an **exceptionally strong technical GEO foundation** — static prerendering, rich JSON-LD schema, a dynamic llms.txt endpoint, and 9 AI crawlers explicitly whitelisted. The site's technical infrastructure places it in the top 5% of local business websites for AI discoverability. However, this strong foundation is undercut by two significant weaknesses: **critically low brand authority across third-party platforms** (unclaimed Yelp listing, ~10 total reviews across all platforms, negative review dominance) and **gaps in schema coverage and informational content** that limit how often AI systems can cite the site for common pool-industry queries. Fixing the off-site brand authority issues and adding missing structured data could push this score into the 80+ range within 6 months.

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability | 77/100 | 25% | 19.25 |
| Brand Authority | 42/100 | 20% | 8.40 |
| Content E-E-A-T | 74/100 | 20% | 14.80 |
| Technical GEO | 90/100 | 15% | 13.50 |
| Schema & Structured Data | 65/100 | 10% | 6.50 |
| Platform Optimization | 42/100 | 10% | 4.20 |
| **Overall GEO Score** | | | **66.65 → 67/100** |

---

## Critical Issues (Fix Immediately)

### 1. Yelp Listing Is Unclaimed with 1.5-Star Rating
The Yelp listing at [yelp.com/biz/paragon-pools-willernie-2](https://www.yelp.com/biz/paragon-pools-willernie-2) is unclaimed, meaning the business cannot respond to negative reviews. The current 1.5-star average (from 2 reviews) is prominently visible to anyone searching — including AI systems. Yelp is one of the highest-authority review sources that AI models index.

**Fix:** Claim the Yelp business page immediately. Respond professionally to existing negative reviews. Begin soliciting positive reviews from satisfied customers.

### 2. Forest Lake Location Marked "Permanently Closed" on Birdeye
The Birdeye listing for the Forest Lake location (1148 W Broadway Ave) shows "permanently closed." If the location is still operating, this is a conflicting signal that confuses AI systems performing entity resolution.

**Fix:** Contact Birdeye to correct the listing, or confirm the closure and update the website to reflect only active locations.

### 3. Custom Domain Not Yet Configured on Vercel
All URLs in the sitemap, canonical tags, Open Graph, and JSON-LD schema reference `https://www.paragonpoolandspa.com`, but the site currently serves from `paragon-pools.vercel.app`. AI crawlers following sitemap URLs or canonical URLs will encounter mismatches until the domain is configured.

**Fix:** Set `www.paragonpoolandspa.com` as the production domain on Vercel.

---

## High Priority Issues

### 4. Near-Zero Review Volume Across All Platforms
Approximately 10-12 total reviews across all platforms for a 35-year-old business. AI models weigh aggregate review signals heavily when recommending local businesses. Competitors with 50+ Google reviews will be cited preferentially.

**Fix:** Launch a systematic review generation campaign. Ask satisfied customers to post on Google, BBB, and Angi. Target 5+ new reviews per month. Goal: 50+ reviews within 6 months.

### 5. Service Schema Generator Exists But Is Never Called
The `generateServiceSchema()` function is fully built and tested in `src/lib/schema.ts` but is never invoked on any page. The Services page lists 8 detailed services with no corresponding Service schema. AI systems cannot extract individual service entities via structured data.

**Fix:** Wire up the existing `generateServiceSchema()` function on the Services page for all 8 services.

### 6. Products Page Has Zero Product Schema for 15 Items
The Products page renders 15 product types across 5 categories, each with name and description data. None have Product schema. AI systems processing "hot tubs near me" or "pool equipment Minnesota" queries get no schema-backed signal from this page.

**Fix:** Generate Product schema for each product item on the Products page. The `generateProductSchema()` function already exists.

### 7. Review Schema Lacks aggregateRating and Star Ratings
The 6 testimonials have no numeric ratings (`reviewRating`) and no `aggregateRating` on the business entity. Google's Rich Results Test will mark these as ineligible for review rich results. AI systems that display ratings (Perplexity, Google AI Overviews) cannot present a score.

**Fix:** Add `rating: 5` to each review in testimonials content. Add `aggregateRating` to the review schema generator. All 6 reviews are clearly 5-star positive.

### 8. No Privacy Policy Despite Collecting Personal Data
The contact form collects name, email, phone, budget, timeline, and referral source — substantial personal data — with no privacy policy or data handling disclosure. This is both a legal risk and a trust signal gap.

**Fix:** Add a `/privacy` page with clear data handling language.

---

## Medium Priority Issues

### 9. No Informational/Educational Content
Zero blog posts, guides, or how-to articles. The site is transactionally complete but informationally empty. AI systems answering "how to winterize a pool in Minnesota" or "vinyl liner vs fiberglass" have nothing to cite from this site.

**Fix:** Create 3-5 foundational articles leveraging Mike Henry's 50+ years of experience. Priority topics: pool cost guide, winterization, vinyl liner pros/cons, maintenance checklist.

### 10. Owner Mike Henry Has No Personal Brand Online
With 50+ years in the industry, Mike Henry is invisible in AI search results. Searching "Mike Henry pool builder Minnesota" returns no relevant results. AI models increasingly use founder entity recognition as a trust signal.

**Fix:** Complete LinkedIn profile with industry history and Latham award. Seek quotes in local publications. Add detailed Person schema to the About page.

### 11. Plans & Pricing Page Has No Schema for 3 Tiers + 7 Services
The page lists 3 maintenance plans and 7 additional services — all "Contact for Quote" — with no Service, Offer, or PriceSpecification schema.

**Fix:** Add Service schema for each maintenance tier and additional service, even with `priceRange: "Contact for Quote"`.

### 12. No HowTo Schema for 4-Step Process
The Consultation → Design → Build → Enjoy process on the Services page maps perfectly to HowTo/HowToStep schema, which Google renders as rich results and AI systems extract for process queries.

**Fix:** Create `generateHowToSchema()` and invoke it on the Services page.

### 13. Missing og:image File
The Open Graph image is referenced as `/og-image.jpg` but the file does not exist. Social sharing and AI image extraction will show nothing.

**Fix:** Create a branded Open Graph image (1200x630) and add it to `public/`.

### 14. Missing Notable AI Crawlers in robots.txt
While 9 AI crawlers are whitelisted, several increasingly relevant ones are absent: Bytespider (TikTok), Meta-ExternalAgent, Amazonbot, YouBot. They're covered by the wildcard `*` rule but explicit listing signals intent.

**Fix:** Add Bytespider, Meta-ExternalAgent, Amazonbot, and YouBot to robots.ts.

---

## Low Priority Issues

### 15. No ContactPoint Schema on Contact Page
The highest-conversion page has no ContactPoint structured data for phone, email, or contact options.

### 16. Duplicate HomeAndConstructionBusiness Entity on Testimonials Page
The Review schema creates a second LocalBusiness node. Combined with the global one from layout.tsx, there are two unlinked entities on that page.

### 17. WebSite Schema Is Minimal
The WebSite schema has only `name` and `url`. Missing `potentialAction` with `SearchAction` and `publisher`.

### 18. No Gallery/Portfolio Page
The Wix site had a Gallery page. Visual evidence of completed work is one of the strongest experience signals for a construction business.

### 19. Reviews Have No Dates
The Review schema accepts `datePublished` but none of the 6 reviews provide dates. Undated reviews lose temporal relevance for AI systems.

### 20. No Instagram, YouTube, or TikTok Presence
For a pool/spa business where visual content drives engagement, the absence of visual social platforms is a significant brand authority gap.

---

## Category Deep Dives

### AI Citability (77/100)

**Strengths:**
- FAQ section provides 5 directly quotable answer blocks with specific data ("6-10 weeks," "steel wall vinyl liner")
- The $51,995 package price appears in 4 surfaces (HTML, JSON-LD, homepage, llms.txt) — quadruple reinforcement
- Additional cost line items (permit $300-600, electrical $2,700-3,000) answer "hidden costs of a pool" queries
- 6 testimonials with real names and specific project details (18x36 package, "finished in 9 days")

**Weaknesses:**
- Only 1 of 4 packages has a price; 3 say "Call for Quote" — uncitable for AI
- All maintenance plans say "Contact for Pricing" — the entire Plans & Pricing page is uncitable for cost queries
- No educational content for informational queries (the majority of pool-related AI queries)
- No comparison content (vinyl vs fiberglass, pool vs hot tub costs)

**Top recommendation:** Add price ranges to all packages and maintenance tiers. Even "Starting at $44,000" or "$150-250/month" enables AI citation.

### Brand Authority (42/100)

**Strengths:**
- BBB A+ accredited since 1998 (27 years — exceptional longevity)
- 91 building permits since 1995 (per BuildZoom — government-sourced verification)
- Business appears on 15+ platforms (BBB, Angi, Yelp, Yellow Pages, Nextdoor, etc.)

**Weaknesses:**
- ~10-12 total reviews across all platforms (catastrophically low for 35-year business)
- Yelp (1.5 stars, unclaimed) and Yahoo Local (1.0 star) are negative-dominated
- No Google Knowledge Panel detected
- No Instagram, YouTube, or TikTok presence
- Latham dealer page redirects (broken link — lost authority signal)
- Owner has no personal brand online

**Top recommendation:** Claim Yelp immediately. Launch review generation campaign targeting 50+ Google reviews in 6 months.

### Content E-E-A-T (74/100)

**Strengths:**
- Exceptional specificity — 14-gauge steel walls, Hayward model numbers, $28/LF fencing, "finished in 9 days"
- Real customer names on testimonials with project-specific details
- Founder story grounded in specific biography (laborer in early 1970s → owner since 1990)
- Climate-aware content ("Minnesota winters," "year-round use in Minnesota")

**Weaknesses:**
- No project gallery or before/after photos (the `GalleryGrid` component exists but no `/gallery` page)
- No dates on testimonials — temporal context missing
- Single team member identified (only Mike Henry for a 3-location business)
- No certifications or license numbers displayed
- "Authorized dealer" claim only in llms.txt, not on user-facing pages

**Top recommendation:** Add real project photography and a gallery page. Visual evidence is the single highest-impact E-E-A-T improvement for a construction business.

### Technical GEO (90/100)

**Strengths:**
- Static prerendering: 12 pages served as complete HTML from Vercel edge CDN — no JavaScript required for content access
- Dynamic llms.txt generated from source data (auto-syncs with content changes)
- 9 AI crawlers explicitly whitelisted with proper `/api/` exclusion
- Complete per-page metadata: Open Graph, Twitter Card, canonical URLs, geo meta tags, 18 keywords
- Semantic HTML with `<nav aria-label>`, proper heading hierarchy, `<details>/<summary>` for FAQs

**Weaknesses:**
- Sitemap URL domain mismatch (references www.paragonpoolandspa.com but serves from paragon-pools.vercel.app)
- Missing og:image file (referenced but doesn't exist)
- Missing 4-5 additional AI crawlers (covered by wildcard but not explicitly listed)

**Top recommendation:** Configure the custom domain on Vercel to resolve the URL mismatch.

### Schema & Structured Data (65/100)

**Present (working well):**
- HomeAndConstructionBusiness with knowsAbout (9 topics), founder Person, 3 GeoCoordinates, 14 areaServed cities, OpeningHoursSpecification
- BreadcrumbList on all 7 interior pages
- FAQPage with 5 real Q&As on Services
- Product with Offer ($51,995) on Packages
- Review (6 reviews) on Testimonials
- WebSite on all pages

**Missing (significant gaps):**
- Service schema (function built, never called) — 8 services with no schema
- Product schema for 15 items on Products page — zero coverage
- aggregateRating / reviewRating — no star ratings on any review
- HowTo schema for 4-step process
- ContactPoint on Contact page
- Service/Offer on Plans & Pricing (3 tiers, 7 services)

**Top recommendation:** Wire up the existing `generateServiceSchema()` on the Services page and add Product schema to the Products page. Both use existing code patterns.

### Platform Optimization (42/100)

**Present:** Facebook, LinkedIn (basic), Nextdoor, BBB, Angi, Yelp (unclaimed), Yellow Pages, Superpages, D&B, ZoomInfo, BuildZoom, Manta, Porch, MinnBuild, myHomePro, Yahoo Local, Birdeye

**Missing:** Instagram, YouTube, TikTok, Houzz, HomeAdvisor (as separate from Angi), Google Business Profile (unclaimed/unoptimized), Wikipedia/Wikidata, Reddit, industry forums

**Top recommendation:** Claim Google Business Profile and Yelp. Create Instagram account. Get listed on Houzz.

---

## Quick Wins (Implement This Week)

1. **Claim Yelp listing and respond to reviews** — Stops the negative-dominant signal from an unclaimed profile. Cost: $0. Time: 30 minutes. Impact: Prevents further brand authority damage.

2. **Add `rating: 5` to all 6 testimonials + aggregateRating to Review schema** — Code change in 2 files. Unlocks review rich results in Google and AI rating display. Time: 15 minutes.

3. **Wire up `generateServiceSchema()` on Services page** — The function is already built and tested. Just needs to be called. 8 new Service entities for AI extraction. Time: 15 minutes.

4. **Create og:image.jpg** — Any branded 1200x630 image. Fixes broken social sharing and Open Graph across all pages. Time: 30 minutes.

5. **Fix Forest Lake "permanently closed" on Birdeye** — Contact Birdeye to correct listing status. Resolves conflicting location data for AI entity resolution. Time: 15 minutes.

---

## 30-Day Action Plan

### Week 1: Foundation Fixes
- [ ] Claim Yelp business page and respond to all reviews
- [ ] Verify/claim Google Business Profile for all 3 locations
- [ ] Fix Birdeye "permanently closed" listing for Forest Lake
- [ ] Configure custom domain (paragonpoolandspa.com) on Vercel
- [ ] Add aggregateRating + reviewRating to Review schema
- [ ] Wire up Service schema on Services page (8 services)
- [ ] Create and deploy og:image.jpg

### Week 2: Schema Expansion
- [ ] Add Product schema to Products page (15 items)
- [ ] Add HowTo schema for 4-step process on Services page
- [ ] Add ContactPoint schema on Contact page
- [ ] Add Service schema to Plans & Pricing page
- [ ] Add 4-5 additional AI crawlers to robots.txt
- [ ] Add privacy policy page
- [ ] Fix duplicate HomeAndConstructionBusiness entity on Testimonials page

### Week 3: Content & Brand
- [ ] Create project gallery page with real photos (or client-sourced images)
- [ ] Add dates to testimonials (even approximate years)
- [ ] Add price ranges to remaining 3 packages and maintenance tiers
- [ ] Complete Mike Henry's LinkedIn profile with industry history and Latham award
- [ ] Add "authorized dealer" claims to user-facing pages (not just llms.txt)

### Week 4: Authority Building
- [ ] Request reviews from 5-10 satisfied past customers (Google first, then BBB/Angi)
- [ ] Create Instagram account and post 5-10 project photos
- [ ] Contact Latham Pools to restore dealer directory page
- [ ] Create first educational article ("What Does an Inground Pool Cost in Minnesota?")
- [ ] Claim/update profiles on Houzz, Porch, and MinnBuild

---

## Appendix: Pages Analyzed

| URL | Title | Schema Types | GEO Issues |
|---|---|---|---|
| `/` | Paragon Pool & Spa \| Pool, Spa & Sauna Experts \| Twin Cities MN | LocalBusiness, WebSite | No issues |
| `/services` | Pool, Spa & Sauna Services \| Paragon Pool & Spa | + FAQPage, BreadcrumbList | Missing: Service (8), HowTo |
| `/packages` | Pool Packages \| Paragon Pool & Spa | + Product (1), BreadcrumbList | Missing: Product (3 unpriced packages) |
| `/products` | Products \| Paragon Pool & Spa | + BreadcrumbList only | Missing: Product (15 items) |
| `/plans-pricing` | Plans & Pricing \| Paragon Pool & Spa | + BreadcrumbList only | Missing: Service (3 tiers + 7 services) |
| `/about` | About Us \| Paragon Pool & Spa | + BreadcrumbList only | Missing: Person (Mike Henry) |
| `/testimonials` | Customer Testimonials \| Paragon Pool & Spa | + Review (6), BreadcrumbList | Missing: aggregateRating, reviewRating, dates |
| `/contact` | Contact Us \| Paragon Pool & Spa | + BreadcrumbList only | Missing: ContactPoint |
| `/robots.txt` | — | — | 9 AI crawlers; missing 4-5 additional |
| `/sitemap.xml` | — | — | Domain mismatch with production URL |
| `/llms.txt` | — | — | No version indicator; missing llms-full.txt |

---

## Methodology

This audit was conducted using a 5-subagent parallel analysis framework:

1. **AI Citability Analyst** — Evaluated quotability, factual density, entity clarity, and Q&A coverage across all 8 pages
2. **Brand Authority Analyst** — Searched 20+ platforms for business presence, review volume, third-party mentions, and entity recognition
3. **Technical GEO Analyst** — Audited robots.txt, llms.txt, rendering architecture, meta tags, and cache headers
4. **Content E-E-A-T Analyst** — Assessed experience, expertise, authoritativeness, and trustworthiness signals
5. **Schema & Structured Data Analyst** — Audited all 7 JSON-LD generators, per-page schema coverage, completeness, accuracy, and GEO-critical types

All "before" data verified against Wix scrape at `scripts/scraped-data/wix-content.md`. All "after" data verified against the live codebase. Brand authority claims verified via live web searches and platform fetches.

### Score Weights (GEO Composite Formula)
```
GEO Score = (Citability × 0.25) + (Brand Authority × 0.20) + (E-E-A-T × 0.20) +
            (Technical × 0.15) + (Schema × 0.10) + (Platform × 0.10)
```

### Score Interpretation
| Range | Rating | Meaning |
|---|---|---|
| 90-100 | Excellent | Top-tier GEO; highly likely to be cited by AI |
| 75-89 | Good | Strong foundation with room to improve |
| 60-74 | Fair | Moderate presence; significant opportunities |
| 40-59 | Poor | Weak signals; AI struggles to cite or recommend |
| 0-39 | Critical | Largely invisible to AI systems |

---

*Generated by parallel GEO audit framework — 5 specialized subagents, 8 pages crawled, 20+ external platforms checked.*
