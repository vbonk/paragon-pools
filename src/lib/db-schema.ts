/**
 * Drizzle ORM Schema — Paragon Pools
 *
 * Canonical source: ai-marketing/schemas/drizzle/schema.ts
 * Multi-tenancy: shared-schema with client_slug column + RLS
 */

import {
  pgTable,
  bigserial,
  varchar,
  text,
  integer,
  numeric,
  timestamp,
  index,
  uniqueIndex,
  char,
} from "drizzle-orm/pg-core";

// ---------------------------------------------------------------------------
// leads
// ---------------------------------------------------------------------------

export const leads = pgTable(
  "leads",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    clientSlug: varchar("client_slug", { length: 100 }).notNull(),
    name: varchar("name", { length: 255 }),
    email: varchar("email", { length: 255 }).notNull(),
    website: varchar("website", { length: 500 }),
    service: varchar("service", { length: 100 }),
    budget: varchar("budget", { length: 50 }),
    message: text("message"),
    ipHash: varchar("ip_hash", { length: 64 }),
    userAgent: text("user_agent"),
    referrer: varchar("referrer", { length: 500 }),
    pageUrl: varchar("page_url", { length: 500 }),
    notifiedAt: timestamp("notified_at", { withTimezone: true }),
    nurtureStatus: varchar("nurture_status", { length: 50 }).default("pending"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    clientIdx: index("idx_leads_client").on(table.clientSlug),
    notifiedIdx: index("idx_leads_notified").on(table.notifiedAt),
  })
);

// ---------------------------------------------------------------------------
// attribution_events
// ---------------------------------------------------------------------------

export const attributionEvents = pgTable(
  "attribution_events",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    eventTimestamp: timestamp("event_timestamp", { withTimezone: true })
      .defaultNow()
      .notNull(),
    clientSlug: varchar("client_slug", { length: 100 }).notNull(),
    referrer: varchar("referrer", { length: 2000 }),
    referrerCategory: varchar("referrer_category", { length: 50 }).notNull(),
    landingPage: varchar("landing_page", { length: 2000 }),
    utmSource: varchar("utm_source", { length: 500 }),
    utmMedium: varchar("utm_medium", { length: 500 }),
    utmCampaign: varchar("utm_campaign", { length: 500 }),
    sessionDurationMs: integer("session_duration_ms").default(0),
    scrollDepthPct: integer("scroll_depth_pct").default(0),
    pagesViewed: integer("pages_viewed").default(1),
    conversionType: varchar("conversion_type", { length: 100 }),
    conversionValue: numeric("conversion_value", { precision: 10, scale: 2 }),
    userAgent: varchar("user_agent", { length: 2000 }),
    siteStage: varchar("site_stage", { length: 20 }).default("prod").notNull(),
    ipHash: char("ip_hash", { length: 16 }).notNull(),
  },
  (table) => ({
    clientTsIdx: index("idx_attr_client_ts").on(
      table.clientSlug,
      table.eventTimestamp
    ),
    categoryIdx: index("idx_attr_category").on(table.referrerCategory),
    dedupIdx: uniqueIndex("idx_attr_dedup").on(
      table.ipHash,
      table.clientSlug,
      table.landingPage
    ),
  })
);

// ---------------------------------------------------------------------------
// Type exports
// ---------------------------------------------------------------------------

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;

export type AttributionEvent = typeof attributionEvents.$inferSelect;
export type NewAttributionEvent = typeof attributionEvents.$inferInsert;
