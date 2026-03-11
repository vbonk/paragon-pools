import { Pool } from "pg";

let pool: Pool | null = null;

export function getPool(): Pool {
  if (!pool) {
    // Strip sslmode from connection string — pg v8.x treats sslmode=require
    // as verify-full, which rejects Railway's self-signed certificate.
    const raw = process.env.DATABASE_URL;
    if (!raw) throw new Error("DATABASE_URL is required");
    const url = new URL(raw);
    url.searchParams.delete("sslmode");

    pool = new Pool({
      connectionString: url.toString(),
      ssl: { rejectUnauthorized: false },
      max: 3,
    });
  }
  return pool;
}
