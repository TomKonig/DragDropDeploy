import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
import IntlMessageFormat from 'intl-messageformat';

export type LocaleStore = Record<string, any>;

export class I18nService {
  private locales: Record<string, LocaleStore> = {};
  private defaultLocale = 'en';
  private loaded = false;

  constructor(private baseDir = path.resolve(process.cwd(), 'locales')) {}

  load() {
    if (this.loaded) return;
    if (!fs.existsSync(this.baseDir)) return;
    const localeDirs = fs.readdirSync(this.baseDir).filter(d => fs.statSync(path.join(this.baseDir, d)).isDirectory());
    for (const locale of localeDirs) {
      const dir = path.join(this.baseDir, locale);
      const files = fs.readdirSync(dir).filter(f => f.endsWith('.yml') || f.endsWith('.yaml'));
      const store: LocaleStore = {};
      for (const file of files) {
        const raw = fs.readFileSync(path.join(dir, file), 'utf8');
        const parsed = yaml.parse(raw) || {};
        deepMerge(store, parsed);
      }
      this.locales[locale] = store;
    }
    this.loaded = true;
  }

  t(key: string, params?: Record<string, any>, locale?: string): string {
    if (!this.loaded) this.load();
    const loc = locale && this.locales[locale] ? locale : this.defaultLocale;
    const value = lookupKey(this.locales[loc], key) ?? key;
    if (typeof value !== 'string') return key;
    try {
      const fmt = new IntlMessageFormat(value, loc);
      return fmt.format(params || {}) as string;
    } catch {
      return value;
    }
  }
}

function lookupKey(obj: any, key: string): any {
  return key.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj);
}

function deepMerge(target: any, source: any) {
  for (const k of Object.keys(source)) {
    if (source[k] && typeof source[k] === 'object' && !Array.isArray(source[k])) {
      if (!target[k]) target[k] = {};
      deepMerge(target[k], source[k]);
    } else {
      target[k] = source[k];
    }
  }
  return target;
}

export const i18n = new I18nService();
