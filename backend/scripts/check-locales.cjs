#!/usr/bin/env node
/**
 * Locale consistency checker.
 * - Ensures every locale has identical key set as default (en)
 * - Reports missing / extra keys
 */
const fs = require('fs');
const path = require('path');
const yaml = require('yaml');

const baseDir = path.resolve(process.cwd(), 'locales');
const defaultLocale = 'en';

function loadLocale(locale) {
  const dir = path.join(baseDir, locale);
  if (!fs.existsSync(dir)) return {};
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.yml') || f.endsWith('.yaml'));
  const data = {};
  for (const file of files) {
    const raw = fs.readFileSync(path.join(dir, file), 'utf8');
    const parsed = yaml.parse(raw) || {};
    deepMerge(data, parsed);
  }
  return data;
}

function deepMerge(target, source) {
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

function flatten(obj, prefix = '', out = {}) {
  for (const k of Object.keys(obj)) {
    const val = obj[k];
    const key = prefix ? `${prefix}.${k}` : k;
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      flatten(val, key, out);
    } else {
      out[key] = true;
    }
  }
  return out;
}

if (!fs.existsSync(baseDir)) {
  console.error('No locales directory found, skipping.');
  process.exit(0);
}

const locales = fs.readdirSync(baseDir).filter(d => fs.statSync(path.join(baseDir, d)).isDirectory());
if (!locales.includes(defaultLocale)) {
  console.error(`Default locale '${defaultLocale}' not found.`);
  process.exit(1);
}

const baseline = flatten(loadLocale(defaultLocale));
let errors = 0;

for (const loc of locales) {
  if (loc === defaultLocale) continue;
  const keys = flatten(loadLocale(loc));
  const missing = Object.keys(baseline).filter(k => !keys[k]);
  const extra = Object.keys(keys).filter(k => !baseline[k]);
  if (missing.length || extra.length) {
    console.log(`Locale: ${loc}`);
    if (missing.length) {
      console.log('  Missing keys:');
      missing.forEach(k => console.log('   -', k));
    }
    if (extra.length) {
      console.log('  Extra keys:');
      extra.forEach(k => console.log('   -', k));
    }
    errors++;
  }
}

if (errors) {
  console.error(`Locale check failed with ${errors} locale(s) out of sync.`);
  process.exit(1);
}
console.log('Locale keys are consistent.');
