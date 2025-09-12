#!/usr/bin/env node
/*
 Scan docs for placeholder patterns that indicate stale content.
 Exits non-zero if any matches found.
*/

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const DOCS = path.join(ROOT, 'docs');
const GENERATED_DIR = path.join(DOCS, '.generated');

const PATTERNS = [
  /<INSERT_/i,
  /TBD/i,
  /TO BE (ADDED|DONE)/i,
  /once added/i,
  /when added/i,
  /placeholder/i
];

let failures = [];

function walk(dir) {
  // Skip generated API docs to avoid false positives (they're derived artifacts)
  if (dir.startsWith(GENERATED_DIR)) return;
  for (const entry of fs.readdirSync(dir)) {
    const p = path.join(dir, entry);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) walk(p);
    else if (p.endsWith('.md')) checkFile(p);
  }
}

function checkFile(file) {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split(/\r?\n/);
  lines.forEach((line, idx) => {
    for (const re of PATTERNS) {
      if (re.test(line)) {
        // Allow i18n placeholder usage for variables
        if (file.includes('i18n') && line.includes('{{')) continue;
        failures.push(`${file}:${idx + 1}: matched ${re} => ${line.trim()}`);
      }
    }
  });
}

walk(DOCS);

if (failures.length) {
  console.error('Placeholder scan failed:');
  failures.forEach(f => console.error('  ' + f));
  process.exit(1);
} else {
  console.log('Placeholder scan passed (no disallowed placeholders).');
}
