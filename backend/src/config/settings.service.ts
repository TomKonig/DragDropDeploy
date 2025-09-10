import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

interface CachedSetting {
  value: string;
  type: 'STRING' | 'INT' | 'BOOL' | 'JSON';
  parsed: any;
}

@Injectable()
export class SettingsService {
  private cache = new Map<string, CachedSetting>();
  constructor(private prisma: PrismaService) {}

  async get(key: string): Promise<any> {
    if (this.cache.has(key)) return this.cache.get(key)!.parsed;
    const rec = await this.prisma.systemSetting.findUnique({ where: { key } });
    if (!rec) throw new NotFoundException(`Setting ${key} not found`);
    const parsed = this.parse(rec.value, rec.type);
    this.cache.set(key, { value: rec.value, type: rec.type, parsed });
    return parsed;
  }

  async getOptional<T = any>(key: string, fallback?: T): Promise<T | undefined> {
    try {
      const v = await this.get(key);
      return v as T;
    } catch {
      return fallback;
    }
  }

  async set(key: string, value: any, type: 'STRING' | 'INT' | 'BOOL' | 'JSON' = 'STRING') {
    const toStore = this.serialize(value, type);
    const rec = await this.prisma.systemSetting.upsert({
      where: { key },
      update: { value: toStore, type },
      create: { key, value: toStore, type },
    });
    const parsed = this.parse(rec.value, rec.type);
    this.cache.set(key, { value: rec.value, type: rec.type, parsed });
    return parsed;
  }

  invalidate(key: string) {
    this.cache.delete(key);
  }

  private parse(raw: string, type: string) {
    switch (type) {
      case 'INT':
        return parseInt(raw, 10);
      case 'BOOL':
        return raw === 'true';
      case 'JSON':
        try {
          return JSON.parse(raw);
        } catch {
          return null;
        }
      default:
        return raw;
    }
  }

  private serialize(value: any, type: string): string {
    switch (type) {
      case 'INT':
        return String(value);
      case 'BOOL':
        return value ? 'true' : 'false';
      case 'JSON':
        return JSON.stringify(value);
      default:
        return String(value);
    }
  }
}
