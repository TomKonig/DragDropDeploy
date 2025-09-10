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
