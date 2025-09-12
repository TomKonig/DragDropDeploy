import { NotFoundException } from '@nestjs/common';
import { SettingsService } from '../settings.service';

class MockPrisma {
  systemSetting = {
    store: new Map<string, any>(),
    findUnique: ({ where: { key } }: any) => {
      return Promise.resolve(this.systemSetting.store.get(key) || null);
    },
    upsert: ({ where: { key }, update, create }: any) => {
      if (this.systemSetting.store.has(key)) {
        const rec = this.systemSetting.store.get(key);
        rec.value = update.value;
        rec.type = update.type;
        return Promise.resolve(rec);
      }
      const rec = { key, value: create.value, type: create.type };
      this.systemSetting.store.set(key, rec);
      return Promise.resolve(rec);
    }
  };
}

describe('SettingsService', () => {
  let prisma: MockPrisma;
  let service: SettingsService;

  beforeEach(() => {
    prisma = new MockPrisma();
    service = new SettingsService(prisma as any);
  });

  it('throws NotFoundException for missing key', async () => {
    await expect(service.get('missing')).rejects.toBeInstanceOf(NotFoundException);
  });

  it('supports set/get for primitive types and caching', async () => {
    await service.set('count', 42, 'INT');
    expect(await service.get('count')).toBe(42);
    // mutate underlying store to verify cache hit returns old value
    const rec = prisma.systemSetting.store.get('count');
    rec.value = '43';
    expect(await service.get('count')).toBe(42); // cached value
  });

  it('parses BOOL correctly', async () => {
    await service.set('flag', true, 'BOOL');
    expect(await service.get('flag')).toBe(true);
    await service.set('flag2', false, 'BOOL');
    expect(await service.get('flag2')).toBe(false);
  });

  it('parses JSON and tolerates invalid JSON', async () => {
    await service.set('cfg', { a: 1 }, 'JSON');
    expect(await service.get('cfg')).toEqual({ a: 1 });
    // inject invalid JSON record directly
    prisma.systemSetting.store.set('badjson', { key: 'badjson', value: '{oops', type: 'JSON' });
    expect(await service.get('badjson')).toBeNull();
  });

  it('getOptional returns fallback', async () => {
    const v = await service.getOptional('nope', 'fallback');
    expect(v).toBe('fallback');
  });
});
