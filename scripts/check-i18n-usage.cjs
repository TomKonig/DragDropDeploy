#!/usr/bin/env node
/**
 * i18n usage analyzer
 * - Scans source (backend, frontend, shared) for t('...') and ctx.t('...') calls
 * - Reports undefined keys (used but not in I18N_KEYS)
 * - Reports unused keys (defined but not referenced) (ignoring ones under plugins.* as future-reserved)
 */
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const repoRoot = process.cwd();
const keysFile = path.join(repoRoot, 'shared', 'src', 'locales', 'i18n-keys.ts');

if (!fs.existsSync(keysFile)) {
  console.error('Key union file not found. Run generate:locales first.');
  process.exit(1);
}

const content = fs.readFileSync(keysFile, 'utf8');
const keyMatch = content.match(/I18N_KEYS\s*=\s*\[(.*?)]\s*as const/s);
if (!keyMatch) {
  console.error('Could not parse I18N_KEYS array.');
  process.exit(1);
}
const rawArray = keyMatch[1];
const keyRegex = /'([^']+)'/g;
let m; const allKeys = [];
while ((m = keyRegex.exec(rawArray))) allKeys.push(m[1]);

// Scan files
const patterns = ['backend/src/**/*.ts','frontend/src/**/*.ts','shared/src/**/*.ts'];
const files = patterns.flatMap(p => glob.sync(p, { cwd: repoRoot, absolute: true }));

const usedKeys = new Set();
const usageRegexes = [
  /\bt\(\s*'([^']+)'/g, // t('key'
  /\bt\(\s*"([^"]+)"/g,
  /ctx\.t\(\s*'([^']+)'/g,
  /ctx\.t\(\s*"([^"]+)"/g
];

for (const file of files) {
  const src = fs.readFileSync(file, 'utf8');
  for (const r of usageRegexes) {
    let u;
    while ((u = r.exec(src))) {
      usedKeys.add(u[1]);
    }
  }
}

const keySet = new Set(allKeys);
const undefinedKeys = Array.from(usedKeys).filter(k => !keySet.has(k));
const unusedKeys = allKeys.filter(k => !usedKeys.has(k) && !k.startsWith('plugins.'));

let exit = 0;
if (undefinedKeys.length) {
  console.log('Undefined keys (used but not defined):');
  undefinedKeys.sort().forEach(k => console.log('  -', k));
  exit = 1;
}
if (unusedKeys.length) {
  console.log('Unused keys:');
  unusedKeys.sort().forEach(k => console.log('  -', k));
}
if (!undefinedKeys.length && !unusedKeys.length) {
  console.log('All i18n keys used and defined.');
}
process.exit(exit);
