#!/usr/bin/env node
/**
 * Synchronize docs/reference/changelog.md mirror content with root CHANGELOG.md.
 * Copies everything from the first '## Unreleased' heading in the root file and replaces
 * the existing mirror block starting at that same marker in the docs file.
 *
 * Idempotent: running multiple times yields same file state.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const ROOT_CHANGELOG = path.join(ROOT, 'CHANGELOG.md');
const DOC_CHANGELOG = path.join(ROOT, 'docs', 'reference', 'changelog.md');
const MARKER = '## Unreleased';

function load(file) {
  return fs.readFileSync(file, 'utf8');
}

function sync() {
  const root = load(ROOT_CHANGELOG);
  const doc = load(DOC_CHANGELOG);
  const rootIdx = root.indexOf(MARKER);
  if (rootIdx === -1) {
    console.error('sync-changelog: marker not found in root CHANGELOG.md');
    process.exit(1);
  }
  const docIdx = doc.indexOf(MARKER);
  if (docIdx === -1) {
    console.error('sync-changelog: marker not found in docs/reference/changelog.md');
    process.exit(1);
  }

  const rootSlice = root.slice(rootIdx).trim();

  // Preserve everything before marker in docs (frontmatter, headings, procedure text, mirror intro) then inject updated slice.
  const preserved = doc.slice(0, docIdx).trimEnd();
  const updated = preserved + '\n' + rootSlice + '\n';

  if (updated === doc) {
    console.log('sync-changelog: already up-to-date.');
    return;
  }

  fs.writeFileSync(DOC_CHANGELOG, updated);
  console.log('sync-changelog: mirror updated.');
}

sync();
