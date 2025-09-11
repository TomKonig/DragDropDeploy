#!/usr/bin/env node
/* Ensure docs/reference/changelog.md mirrors root CHANGELOG.md (ignoring header preamble). */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const ROOT_CHANGELOG = path.join(ROOT, 'CHANGELOG.md');
const DOC_CHANGELOG = path.join(ROOT, 'docs', 'reference', 'changelog.md');

function normalize(content) {
  return content
    .replace(/\r/g, '')
    .trim();
}

const rootRaw = fs.readFileSync(ROOT_CHANGELOG, 'utf8');
const docRaw = fs.readFileSync(DOC_CHANGELOG, 'utf8');

// Extract mirrored section from doc after the mirror heading line
const marker = '## Unreleased';
const rootIdx = rootRaw.indexOf(marker);
const docIdx = docRaw.indexOf(marker);
if (rootIdx === -1 || docIdx === -1) {
  console.error('Changelog sync error: could not find Unreleased section marker.');
  process.exit(1);
}
const rootSlice = normalize(rootRaw.slice(rootIdx));
const docSlice = normalize(docRaw.slice(docIdx));

if (rootSlice !== docSlice) {
  console.error('Changelog out of sync with documentation copy. Update docs/reference/changelog.md');
  process.exit(1);
}
console.log('Changelog sync OK.');
