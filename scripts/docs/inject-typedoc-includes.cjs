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
// Already included block pattern to allow re-transforming when transform logic changes
const INCLUDED_BLOCK_REGEX = /<!-- begin:included ([^ ]+) -->[\s\S]*?<!-- end:included \1 -->/g;

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

function transformFragment(raw, key) {
  let out = raw.trim();
  // Demote first level-1 heading (# ) to level-3 (###) to avoid multiple H1s in composite page
  out = out.replace(/^# (.+)$/m, '### $1');
  // Optional: demote any level-2 under original to level-4 to keep hierarchy compact
  out = out.replace(/^## (.+)$/gm, '#### $1');
  // Collapse extremely long pipe unions (like translation key lists) for readability
  out = out.replace(/`((?:[^`]|`(?!`))+?)`/g, (m, inner) => {
    if (inner.length > 400 && inner.includes('|')) {
      // Keep first ~6 segments then ellipsis
      const parts = inner.split('|').map(s => s.trim());
      if (parts.length > 12) {
        return '`' + parts.slice(0, 6).join(' | ') + ' | … | ' + parts.slice(-3).join(' | ') + '`';
      }
    }
    return m;
  });
  // Specific tweak for shared translation helper: shorten the giant key union section heading to a single sentence if present
  if (/shared\/functions\/t\.md$/.test(key)) {
    // Replace giant union code span with an ellipsis summary
    out = out.replace(/### key[\s\S]*?## Parameters/, () => '#### Keys\nLarge union of i18n keys omitted for brevity (see full generated docs).\n\n## Parameters');
    out = out.replace(/`"actions\.cancel"[\s\S]*?"validation\.required"`/, '`<many i18n keys omitted>`');
  }
  // If PrismaService, drop massive inherited method documentation after first custom method heading to reduce noise.
  if (/prisma\/prisma\.service\/classes\/PrismaService\.md$/.test(key)) {
    // Keep until first "### enableShutdownHooks" (custom) and subsequent custom methods, remove large delegate property listings beyond a threshold.
    const lines = out.split(/\n/);
    const keep = [];
    let pruning = false; let keptCustom = false; let retained = 0;
    for (let i=0;i<lines.length;i++) {
      const line = lines[i];
      if (/### enableShutdownHooks/.test(line)) { pruning = false; keptCustom = true; }
      // Start pruning after a large inherited block marker (heuristic: backticks example lines referencing prisma.$queryRaw)
      if (/`prisma\.projectSetting`/.test(line)) pruning = true;
      if (pruning && !/enableShutdownHooks|onModuleInit|onModuleDestroy|setTenantContext/.test(line)) {
        // Skip verbose inherited chunk
        continue;
      }
      keep.push(line);
      retained++;
    }
    out = keep.join('\n');
  }
  // Wrap with markdownlint disable/enable for duplicate headings etc.
  const lintDisable = '<!-- markdownlint-disable MD024 MD025 MD032 -->';
  const lintEnable = '<!-- markdownlint-enable MD024 MD025 MD032 -->';
  return `${lintDisable}\n${out}\n${lintEnable}`;
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
  const rawFrag = extractFragment(entry, anchor);
  const frag = transformFragment(rawFrag, key);
    changed = true;
    return `\n<!-- begin:included ${key} -->\n${frag}\n<!-- end:included ${key} -->\n`;
  });
  // Re-transform existing included blocks (idempotent) so improvements apply without manually restoring tokens
  content = content.replace(INCLUDED_BLOCK_REGEX, (block, key) => {
    try {
      const { entry, anchor } = resolveKey(key, index);
      const rawFrag = extractFragment(entry, anchor);
      const frag = transformFragment(rawFrag, key);
      changed = true;
      return `<!-- begin:included ${key} -->\n${frag}\n<!-- end:included ${key} -->`;
    } catch (e) {
      // If resolution fails, keep original block so we don't destroy content
      return block;
    }
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
