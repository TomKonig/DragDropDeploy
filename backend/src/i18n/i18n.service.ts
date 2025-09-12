import fs from "fs";
import path from "path";

import IntlMessageFormat from "intl-messageformat"; // eslint-disable-line import/no-named-as-default -- library exports both
// Alias to avoid rule complaining about using exported name as default
const MessageFormatter = IntlMessageFormat;
import * as yaml from "yaml";

// LocaleStore can contain nested objects or leaf strings.
export type LocaleLeaf = string;
export interface LocaleStore {
  [k: string]: LocaleLeaf | LocaleStore;
}

export class I18nService {
  private locales: Record<string, LocaleStore> = {};
  private defaultLocale = "en";
  private loaded = false;

  constructor(private baseDir = path.resolve(process.cwd(), "locales")) {}

  load() {
    if (this.loaded) return;
    if (!fs.existsSync(this.baseDir)) return;
    const localeDirs = fs
      .readdirSync(this.baseDir)
      .filter((d) => fs.statSync(path.join(this.baseDir, d)).isDirectory());
    for (const locale of localeDirs) {
      const dir = path.join(this.baseDir, locale);
      const files = fs
        .readdirSync(dir)
        .filter((f) => f.endsWith(".yml") || f.endsWith(".yaml"));
      const store: LocaleStore = {};
      for (const file of files) {
        const raw = fs.readFileSync(path.join(dir, file), "utf8");
        const parsed = yaml.parse(raw) as unknown;
        // Only merge plain object roots; ignore other YAML root types (arrays, scalars) for safety.
        if (isPlainObject(parsed)) {
          deepMerge(store, parsed);
        }
      }
      this.locales[locale] = store;
    }
    this.loaded = true;
  }

  t(key: string, params?: Record<string, unknown>, locale?: string): string {
    if (!this.loaded) this.load();
    const loc = locale && this.locales[locale] ? locale : this.defaultLocale;
    const value = lookupKey(this.locales[loc], key) ?? key;
    if (typeof value !== "string") return key;
    try {
      const fmt = new MessageFormatter(value, loc);
      return fmt.format(params || {}) as string;
    } catch {
      return value;
    }
  }
}

function lookupKey(
  obj: LocaleStore | LocaleLeaf | undefined,
  key: string,
): LocaleLeaf | LocaleStore | undefined {
  if (!obj || typeof obj !== "object") return undefined;
  return key
    .split(".")
    .reduce<LocaleLeaf | LocaleStore | undefined>((acc, part) => {
      if (!acc || typeof acc !== "object") return undefined;
      return acc[part];
    }, obj);
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function deepMerge(
  target: LocaleStore,
  source: Record<string, unknown>,
): LocaleStore {
  for (const k of Object.keys(source)) {
    const sv = source[k];
    if (isPlainObject(sv)) {
      // Ensure the branch is an object before recursing
      if (!isPlainObject(target[k])) target[k] = {};
      deepMerge(target[k], sv);
    } else if (typeof sv === "string") {
      target[k] = sv;
    }
  }
  return target;
}

export const i18n = new I18nService();
