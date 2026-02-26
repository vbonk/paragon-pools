# Paragon Pool & Spa — Website

## Overview

Modern Next.js website for Paragon Pool & Spa, a family-owned pool/spa/sauna business in the Twin Cities MN metro area. Cloned and enhanced from their original Wix site.

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| Next.js 16 (App Router) | Framework |
| TypeScript | Type safety |
| Tailwind CSS v4 | Styling |
| Zod | Form validation |
| Lucide React | Icons |
| Vitest | Testing |
| Vercel | Deployment target |

## Project Structure

```
src/
  app/              # Pages (App Router)
  components/       # React components
    layout/         # Header, Footer, Nav, Breadcrumbs
    ui/             # Reusable UI primitives
    sections/       # Page section components
    seo/            # JSON-LD, breadcrumb schema
  content/          # Typed content data files
    pages/          # Per-page content
    site.ts         # Global site config
  lib/              # Utilities, constants, schemas
  types/            # TypeScript type definitions
  test/             # Vitest tests
```

## Commands

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Start production server
npx vitest run       # Run tests
npx vitest           # Watch mode tests
```

## Content Management

All page content lives in `src/content/pages/*.ts` as typed TypeScript objects. Business data (NAP, hours, locations) is centralized in `src/lib/constants.ts`.

## CRM Integration

Contact form submits to `/api/leads` which:
1. Rate-limits by IP
2. Validates with Zod
3. Checks honeypot field
4. Fire-and-forget POST to `N8N_WEBHOOK_URL` env var

## Environment Variables

```
N8N_WEBHOOK_URL=<n8n webhook for CRM routing>
NEXT_PUBLIC_SITE_URL=https://www.paragonpoolandspa.com
```

## Key Patterns

- Content is separated from components (content/ directory)
- All business data flows from `COMPANY` constant
- Schema.org JSON-LD generated from `lib/schema.ts`
- Reusable Section + SectionHeader pattern for page layout
- PageHero for interior pages, Hero for home page

## SEO

- Per-page metadata via `createMetadata()` utility
- JSON-LD on every page (LocalBusiness, BreadcrumbList, Review)
- Native Next.js sitemap.ts and robots.ts
- `public/llms.txt` for AI crawler readability
