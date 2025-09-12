#!/usr/bin/env node
/**
 * inject-typedoc-includes.cjs
 *
 * Scans markdown files under docs/reference (and optionally others later) and replaces
 * include tokens of the form:
 *   <!-- include:typedoc path="backend/AuthService#login" -->
 *
 * Resolution strategy:
 * 1. Build an index of generated TypeDoc markdown fragments under docs/.generated/api
 *    mapping a stable key to the raw markdown of that file or a section within it.
 * 2. For now we only support whole-file includes that map:
 *      backend/<Dir>/<File>.md  => key backend/<FileNameWithoutExt>
 *    and symbol anchors (#methodName) picking a heading inside that file.
 * 3. Replace the token with the extracted snippet.
 *
 * Future extensions:
 * - Fine-grained extraction (only signature + parameters table)
 * - JSON index pre-build for faster lookups
 * - Caching hashed outputs
 *
 * Exit with non-zero status if any include cannot be resolved.
 */

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '..');
const GENERATED_ROOT = path.join(root, 'docs', '.generated', 'api');
const TARGET_DIR = path.join(root, 'docs', 'reference');

const INCLUDE_REGEX = /<!--\s*include:typedoc\s+path="([^"]+)"\s*-->/g;

function readAllGeneratedFiles() {
  const index = {}; // key -> { content, headings: [{line, text, slug}] }
  function walk(dir) {
    for (const entry of fs.readdirSync(dir)) {
      const full = path.join(dir, entry);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) walk(full);
      else if (entry.endsWith('.md')) {
        const rel = path.relative(GENERATED_ROOT, full).replace(/\\/g, '/');
        const content = fs.readFileSync(full, 'utf8');
        const headings = [];
        const lines = content.split(/\r?\n/);
        for (let i = 0; i < lines.length; i++) {
          const m = /^(#+)\s+(.*)$/.exec(lines[i]);
          if (m) {
            const text = m[2].trim();
            // naive slug (mkdocs style simplified)
            const slug = text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
            headings.push({ line: i, text, slug });
          }
        }
        // Build a key heuristic: take last path segment without extension
        const baseName = path.basename(rel, '.md');
        index[rel] = { content, headings };
        // also allow lookup by just file base name (risk of collision; TODO guard later)
        if (!index[baseName]) index[baseName] = index[rel];
      }
    }
  }
  if (fs.existsSync(GENERATED_ROOT)) walk(GENERATED_ROOT);
  return index;
}

function extractFragment(fileEntry, anchor) {
  if (!anchor) return fileEntry.content.trim();
  const { headings, content } = fileEntry;
  const lines = content.split(/\r?\n/);
  const target = headings.find(h => h.slug === anchor.toLowerCase());
  if (!target) throw new Error(`Heading anchor '${anchor}' not found in file`);
  // capture until next heading of same or higher level
  const currentLevel = (/^(#+)/.exec(lines[target.line]) || [,'#'])[1].length;
  let end = lines.length;
  for (let i = target.line + 1; i < lines.length; i++) {
    const m = /^(#+)\s+/.exec(lines[i]);
    if (m) {
      const level = m[1].length;
      if (level <= currentLevel) { end = i; break; }
    }
  }
  return lines.slice(target.line, end).join('\n').trim();
}

function resolveKey(rawPath, index) {
  // rawPath examples: backend/auth/auth.service#login OR backend/AuthService#login
  const [filePart, anchor] = rawPath.split('#');
  const normalized = filePart.endsWith('.md') ? filePart : filePart + '.md';
  // try direct relative path in index first
  if (index[normalized]) return { entry: index[normalized], anchor };
  // try base name fallback
  const base = path.basename(filePart);
  if (index[base]) return { entry: index[base], anchor };
  // attempt search for file whose base name matches ignoring case
  const matchKey = Object.keys(index).find(k => path.basename(k).toLowerCase() === base.toLowerCase());
  if (matchKey) return { entry: index[matchKey], anchor };
  throw new Error(`Unable to resolve include key '${rawPath}'`);
}

function processFile(mdPath, index) {
  let content = fs.readFileSync(mdPath, 'utf8');
  let changed = false;
  content = content.replace(INCLUDE_REGEX, (_, key) => {
    const { entry, anchor } = resolveKey(key, index);
    const frag = extractFragment(entry, anchor);
    changed = true;
    return `\n<!-- begin:included ${key} -->\n${frag}\n<!-- end:included ${key} -->\n`;
  });
  if (changed) {
    fs.writeFileSync(mdPath, content, 'utf8');
  }
  return changed;
}

function main() {
  const index = readAllGeneratedFiles();
  if (!fs.existsSync(TARGET_DIR)) return; // nothing to do
  const files = fs.readdirSync(TARGET_DIR).filter(f => f.endsWith('.md'));
  const errors = [];
  let touched = 0;
  for (const f of files) {
    try {
      if (processFile(path.join(TARGET_DIR, f), index)) touched++;
    } catch (e) {
      errors.push(`${f}: ${e.message}`);
    }
  }
  if (errors.length) {
    console.error('Include resolution errors:\n' + errors.join('\n'));
    process.exit(1);
  }
  console.log(`Typedoc include injection complete. Updated ${touched} file(s).`);
}

if (require.main === module) {
  main();
}
