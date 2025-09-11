import { generateStagingSubdomain } from '../subdomain.util';

describe('generateStagingSubdomain', () => {
  it('generates default length and dns safe', () => {
    const sub = generateStagingSubdomain();
    expect(sub).toHaveLength(12);
    expect(/^[a-z][a-z0-9-]*$/.test(sub)).toBe(true);
  });

  it('enforces min and max length', () => {
    expect(generateStagingSubdomain(2).length).toBe(3); // min 3
    expect(generateStagingSubdomain(40).length).toBe(32); // max 32
  });

  it('is reasonably random across calls', () => {
    const set = new Set<string>();
    for (let i = 0; i < 25; i++) set.add(generateStagingSubdomain());
    expect(set.size).toBeGreaterThan(20);
  });
});
