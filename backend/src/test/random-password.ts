export function randomPassword(length = 16) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*()_+-=';
  let out = '';
  const arr = new Uint32Array(length);
  if (typeof crypto !== 'undefined' && 'getRandomValues' in crypto) {
    crypto.getRandomValues(arr);
  } else {
    throw new Error("Secure random number generator (crypto.getRandomValues) is not available. Cannot generate a secure random password.");
  }
  for (let i = 0; i < length; i++) out += chars[arr[i] % chars.length];
  return out;
}

export function randomEmail(domain = 'example.test') {
  // Use crypto for entropy; fallback not provided to avoid weak test IDs.
  const bytes = new Uint32Array(4);
  if (typeof crypto !== 'undefined' && 'getRandomValues' in crypto) {
    crypto.getRandomValues(bytes);
  } else {
    throw new Error('crypto.getRandomValues unavailable for randomEmail');
  }
  const token = Array.from(bytes).map(b => b.toString(36)).join('').slice(0, 12);
  return `u_${token}@${domain}`;
}
