const BUCKET = {};

export function rateLimit(ip, limit = 20) {
  const now = Date.now();
  BUCKET[ip] = (BUCKET[ip] || []).filter(t => now - t < 60000);
  if (BUCKET[ip].length >= limit) return false;
  BUCKET[ip].push(now);
  return true;
}
