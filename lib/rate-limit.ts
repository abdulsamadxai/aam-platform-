// Basic in-memory rate limiter for Next.js Server Actions
// Note: In a multi-instance production environment (like serverless functions), 
// this should be replaced with a Redis-backed solution like @upstash/ratelimit.

const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

export function checkRateLimit(ip: string, limit: number = 5, windowMs: number = 60000) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return true;
  }

  if (now - record.lastReset > windowMs) {
    // Reset window
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return true;
  }

  if (record.count >= limit) {
    return false; // Rate limit exceeded
  }

  record.count += 1;
  return true;
}
