import crypto from 'crypto';

/**
 * Generate a random, DNS-safe staging subdomain.
 * Constraints:
 * - Lowercase alphanumeric + hyphen.
 * - Starts with letter.
 * - Length configurable (default 12) within 3..32.
 * - Avoid leading/trailing hyphen; collapse multiple hyphens.
 */
export function generateStagingSubdomain(length = 12): string {
  if (length < 3) length = 3;
  if (length > 32) length = 32;
  // Use hex entropy then map to allowed set.
  const raw = crypto.randomBytes(Math.ceil(length)).toString('hex');
  const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let out = '';
  for (let i = 0; i < raw.length && out.length < length; i++) {
    const c = raw[i];
    if (/[a-f0-9]/.test(c)) {
      out += c;
    }
  }
  // Ensure starts with letter
  if (!/^[a-z]/.test(out)) {
    out = 'a' + out.slice(1);
  }
  return out.slice(0, length);
}
