// In-memory rate limiter.
// WARNING: This only works correctly in single-process, long-running environments.
// In serverless deployments (Vercel Edge, AWS Lambda), each invocation starts fresh
// and this limiter has no effect. For production serverless deployments, replace
// with @upstash/ratelimit backed by Redis:
//   https://github.com/upstash/ratelimit
//
// To install the Redis-backed alternative:
//   npm install @upstash/ratelimit @upstash/redis

const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

function normalizeIp(ip: string): string {
  return ip.replace(/^::ffff:/, "");
}

export function checkRateLimit(
  ip: string,
  limit: number = 5,
  windowMs: number = 60_000
): boolean {
  const key = normalizeIp(ip);
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now - record.lastReset > windowMs) {
    rateLimitMap.set(key, { count: 1, lastReset: now });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count += 1;
  return true;
}

// Evict stale entries periodically to prevent memory growth in long-running processes.
// Runs every 10 minutes; fine to let GC clean up if the process restarts sooner.
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const cutoff = Date.now() - 10 * 60_000;
    for (const [key, record] of rateLimitMap.entries()) {
      if (record.lastReset < cutoff) rateLimitMap.delete(key);
    }
  }, 10 * 60_000);
}
