/**
 * Simple in-memory rate limiter for serverless environments.
 * Uses a sliding window approach with automatic cleanup.
 */

const rateMap = new Map<string, number[]>();
const CLEANUP_INTERVAL = 60 * 1000; // 1 minute
let lastCleanup = Date.now();

function cleanup(windowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;

  for (const [key, timestamps] of rateMap.entries()) {
    const valid = timestamps.filter((t) => now - t < windowMs);
    if (valid.length === 0) {
      rateMap.delete(key);
    } else {
      rateMap.set(key, valid);
    }
  }
}

export function rateLimit(
  ip: string,
  {
    maxRequests = 5,
    windowMs = 60 * 60 * 1000,
  }: { maxRequests?: number; windowMs?: number } = {}
): { success: boolean; remaining: number } {
  cleanup(windowMs);

  const now = Date.now();
  const timestamps = rateMap.get(ip) ?? [];
  const windowStart = now - windowMs;
  const recentRequests = timestamps.filter((t) => t > windowStart);

  if (recentRequests.length >= maxRequests) {
    return { success: false, remaining: 0 };
  }

  recentRequests.push(now);
  rateMap.set(ip, recentRequests);

  return { success: true, remaining: maxRequests - recentRequests.length };
}
