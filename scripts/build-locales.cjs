#!/usr/bin/env node
/**
 * Build TypeScript locale modules from YAML source under /locales.
 * Output: shared/src/locales/<locale>.ts exporting a record of keys to strings.
 */
const fs = require('fs');
const path = require('path');
const yaml = require('yaml');

const root = process.cwd();
const localesDir = path.join(root, 'locales');
const outDir = path.join(root, 'shared', 'src', 'locales');

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
      out[key] = String(val);
    }
  }
  return out;
}

function build() {
  if (!fs.existsSync(localesDir)) {
    console.error('No locales directory found.');
    process.exit(1);
  }
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const localeDirs = fs.readdirSync(localesDir).filter(d => fs.statSync(path.join(localesDir, d)).isDirectory());
  const indexExports = [];
  let allKeysSet = new Set();
  for (const locale of localeDirs) {
    const dir = path.join(localesDir, locale);
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.yml') || f.endsWith('.yaml'));
    const store = {};
    for (const file of files) {
      const raw = fs.readFileSync(path.join(dir, file), 'utf8');
      const parsed = yaml.parse(raw) || {};
      deepMerge(store, parsed);
    }
  const flat = flatten(store);
  Object.keys(flat).forEach(k => allKeysSet.add(k));
    const entries = Object.entries(flat)
      .sort(([a],[b]) => a.localeCompare(b))
      .map(([k,v]) => `  '${k}': ${JSON.stringify(v)},`) // keep single quotes for keys
      .join('\n');
    const content = `// Auto-generated from YAML sources. Do not edit manually.\nexport const messages: Record<string,string> = {\n${entries}\n};\n`;
    fs.writeFileSync(path.join(outDir, `${locale}.ts`), content, 'utf8');
    indexExports.push(`import { messages as ${locale} } from './${locale}';`);
  }
  const indexContent = `${indexExports.join('\n')}\n\nexport const allLocales: Record<string, Record<string,string>> = {\n${indexExports.map(l => '  ' + l.match(/messages as (.+) }/)[1] + ',').join('\n')}\n};\n`;
  fs.writeFileSync(path.join(outDir, 'index.ts'), indexContent, 'utf8');
  // Generate key union file
  const allKeys = Array.from(allKeysSet).sort();
  const keyFile = `// Auto-generated key union\nexport const I18N_KEYS = [\n${allKeys.map(k => `  '${k}',`).join('\n')}\n] as const;\nexport type I18nKey = typeof I18N_KEYS[number];\n`;
  fs.writeFileSync(path.join(outDir, 'i18n-keys.ts'), keyFile, 'utf8');
  console.log('Locales built to shared/src/locales');
}

build();
