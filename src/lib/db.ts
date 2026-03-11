/**
 * Drizzle ORM Client — Paragon Pools
 *
 * Lazy-initialized singleton with connection pooling.
 * Uses DATABASE_URL env var (Railway PostgreSQL).
 */

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./db-schema";

let _pool: Pool | null = null;
let _db: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function getDb() {
  if (!_db) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error(
        "DATABASE_URL is required. Set it in Vercel environment variables with your Railway PostgreSQL connection string."
      );
    }

    // Strip sslmode from connection string — pg v8.x treats sslmode=require
    // as verify-full, which rejects Railway's self-signed certificate.
    // We handle SSL explicitly via the ssl option below.
    const url = new URL(connectionString);
    url.searchParams.delete("sslmode");

    _pool = new Pool({
      connectionString: url.toString(),
      max: 5,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 10_000,
      ssl: { rejectUnauthorized: false },
    });

    _db = drizzle(_pool, { schema });
  }
  return _db;
}

export { schema };
