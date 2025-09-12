import { Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";

type SettingType = "STRING" | "INT" | "BOOL" | "JSON";
interface CachedSetting<T> {
  value: string;
  type: SettingType;
  parsed: T;
}

type ParsedValue<T extends SettingType> = T extends "INT"
  ? number
  : T extends "BOOL"
    ? boolean
    : T extends "JSON"
      ? unknown
      : string;

@Injectable()
export class SettingsService {
  private cache = new Map<string, CachedSetting<unknown>>();
  constructor(private prisma: PrismaService) {}

  async get<T extends SettingType = "STRING">(
    key: string,
    expectedType?: T,
  ): Promise<ParsedValue<T>> {
    if (this.cache.has(key))
      return this.cache.get(key)!.parsed as ParsedValue<T>;
    const rec = await this.prisma.systemSetting.findUnique({ where: { key } });
    if (!rec) throw new NotFoundException(`Setting ${key} not found`);
    const parsed = this.parse(rec.value, rec.type as SettingType);
    this.cache.set(key, { value: rec.value, type: rec.type, parsed });
    if (expectedType && rec.type !== expectedType) {
      return this.coerce(parsed, expectedType) as ParsedValue<T>;
    }
    return parsed as ParsedValue<T>;
  }

  async getOptional<T>(key: string, fallback?: T): Promise<T | undefined> {
    try {
      const v = await this.get(key);
      return v as unknown as T;
    } catch {
      return fallback;
    }
  }

  async set<T extends SettingType>(
    key: string,
    value: ParsedValue<T>,
    type: T = "STRING" as T,
  ) {
    const toStore = this.serialize(value as unknown, type);
    const rec = await this.prisma.systemSetting.upsert({
      where: { key },
      update: { value: toStore, type },
      create: { key, value: toStore, type },
    });
    const parsed = this.parse(rec.value, rec.type as SettingType);
    this.cache.set(key, { value: rec.value, type: rec.type, parsed });
    return parsed as ParsedValue<T>;
  }

  invalidate(key: string) {
    this.cache.delete(key);
  }

  private parse(raw: string, type: SettingType): ParsedValue<SettingType> {
    switch (type) {
      case "INT":
        return parseInt(raw, 10);
      case "BOOL": {
        const boolVal = raw === "true";
        return boolVal;
      }
      case "JSON":
        try {
          return JSON.parse(raw) as ParsedValue<"JSON">;
        } catch {
          return null as ParsedValue<"JSON">;
        }
      default:
        return raw;
    }
  }

  private serialize(value: unknown, type: SettingType): string {
    if (type === "INT") return String(value);
    if (type === "BOOL") return value ? "true" : "false";
    if (type === "JSON") return JSON.stringify(value);
    return String(value);
  }

  private coerce(
    value: unknown,
    target: SettingType,
  ): ParsedValue<SettingType> {
    try {
      if (target === "INT") return parseInt(String(value), 10);
      if (target === "BOOL") return value === "true" || value === true;
      if (target === "JSON")
        return (
          typeof value === "string" ? JSON.parse(value) : value
        ) as ParsedValue<"JSON">;
      return String(value);
    } catch {
      return (
        target === "JSON"
          ? null
          : target === "INT"
            ? 0
            : target === "BOOL"
              ? false
              : ""
      ) as ParsedValue<SettingType>;
    }
  }
}
