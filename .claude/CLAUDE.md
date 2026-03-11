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
4. Inserts into Railway PG `leads` table with `client_slug: 'paragon-pools'`

### Lead Notification Routing

Lead notifications are handled by a **universal router** n8n workflow (`gWqDfFrdkLafK2io`). It queries Railway PG for unnotified leads, looks up the Telegram `notification_chat_id` from `client_configs`, and routes each lead to the correct client's Telegram group.

- **Paragon's `client_slug`:** `paragon-pools`
- **Telegram group:** Not yet created — needs setup before going live
- **Every lead INSERT must include `client_slug: 'paragon-pools'`** — this is how the router knows where to send
- **Do NOT create a per-client lead notification workflow** — the universal router handles all clients
- **`client_configs` is admin-only** — no agent may modify without explicit human approval. See `ai-marketing/docs/measurement-system.md`

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
## Platform Standards

This project follows the LocalStar Digital platform architecture.
Standards are maintained in the ai-marketing repo.

| Standard | Reference |
|----------|-----------|
| Architecture | ai-marketing/docs/architecture/platform-architecture.md |
| Authentication | ai-marketing/standards/auth.md |
| Analytics | ai-marketing/standards/analytics.md |
| Database | ai-marketing/standards/database.md |
| Billing | ai-marketing/standards/billing.md |
| Security | ai-marketing/standards/security.md |

## Database & Attribution Status

- **Status:** LIVE (Railway PG)
- **Client Slug:** paragon-pools
- **ORM:** Drizzle + pg (node-postgres), lazy singleton with sslmode strip
- **Leads:** `/api/leads` → `db.insert(schema.leads)` → N8N universal router → Telegram
- **Attribution:** `/api/attribution` → `db.insert(schema.attributionEvents)` → Railway PG

## Notion Launch Tracker

This project has a Notion Launch Tracker board for milestone-based project tracking.

| Resource | Value |
|----------|-------|
| Parent Page | [Paragon Pool & Spa](https://www.notion.so/Paragon-Pool-Spa-31c54f5fe2918146bfdadc141ebac346) |
| Database ID | `31c54f5f-e291-811b-89d7-c6bff91f6af6` |
| GitHub Issues | #1–#12 on vbonk/paragon-pools |

### Database Properties

| Property | Type | Purpose |
|----------|------|---------|
| Name | Title | Issue title |
| Status | Select (Planning / In Progress / Done / Blocked) | Current state |
| Milestone | Select (v1.0 Production Launch / v1.1 Post-Launch) | Release grouping |
| Priority | Select (High / Medium) | Urgency |
| Category | Select (Infrastructure / Brand Assets / Analytics / Content / DevOps) | Work type |
| GitHub Issue | Number | Links to GitHub issue # |
| Agent status | Rich Text | Agent reports current activity |
| Agent blocked | Checkbox | Agent signals it needs human input |

### How to Use

Agents and sessions working on this repo should update the Notion board as work progresses:

1. **Read token:** `python3 -c "import json; print(json.load(open('$HOME/.claude/.mcp.json'))['mcpServers']['notion']['env']['NOTION_TOKEN'])"`
2. **Query items:** `curl -s "https://api.notion.com/v1/databases/31c54f5f-e291-811b-89d7-c6bff91f6af6/query" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -H "Notion-Version: 2022-06-28" -d '{}'`
3. **Update status:** PATCH `https://api.notion.com/v1/pages/{PAGE_ID}` with `{"properties": {"Status": {"select": {"name": "Done"}}}}`
4. **Report activity:** Set "Agent status" text when starting work on an item
5. **Signal blockers:** Check "Agent blocked" when human input is needed

### Status Dashboard

Query the database filtered by Status to generate progress summaries. Group by Milestone for release readiness reports.

### Platform Standard

See `ai-marketing/standards/notion.md` for the full schema, API reference, and client registry.

---

## SESSION CONTINUITY STATE (Auto-Updated)

**Last Updated:** 2026-02-27T04:36:33Z
**Phase:** GEO 80+ committed, PDF suite generated
**Task List:**  (Not configured)

### Modified Files
- .claude/HANDOFF.md
- .claude/SESSION_STATE.json
- docs/geo-system/
- scripts/generate_geo_system_pdfs.py

### Current Blockers
None

### Next Actions
- Create author page for Mike Henry with Person schema
- Claim Google Business Profile for all 3 locations (business owner action)
- Launch review campaign targeting 50+ Google reviews (business owner action)
- Configure custom domain (paragonpoolandspa.com) on Vercel
- Configure N8N_WEBHOOK_URL on Vercel for CRM routing

### Recovery Checklist
1. Run `TaskList()` to see current tasks
2. Check for `compaction_checkpoint` in in_progress task metadata
3. Read files listed in `must_read_first`
4. Review blockers above
5. Continue from next actions

---
