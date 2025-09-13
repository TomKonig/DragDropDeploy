#!/usr/bin/env node
/**
 * postprocess-api-md.cjs
 *
 * Cleans up auto-generated sections in docs/reference/api.md to satisfy markdownlint rules:
 * - Convert leading '* ' unordered list markers at left margin to '- '
 * - Normalize list indentation to 0 (remove a single leading space before list markers)
 * - Ensure fenced code blocks inside lists have a language (default 'ts')
 * - Remove duplicate spaces after ATX heading hashes
 * - Ensure blank lines before/after fenced code blocks (except at file boundaries)
 */
const fs = require('fs');
const path = require('path');

// __dirname => scripts/docs ; need to go up TWO levels to repo root
const target = path.join(__dirname, '..', '..', 'docs', 'reference', 'api.md');
if (!fs.existsSync(target)) process.exit(0);
let content = fs.readFileSync(target, 'utf8');

// Process full file because TypeDoc includes appear outside AUTO-API block.
let block = content;

// Preserve YAML frontmatter delimiters if present at top (--- on line 1 and within first 5 lines again)
let frontmatterMatch = null;
if (/^---\n[\s\S]*?\n---\n/.test(block)) {
  frontmatterMatch = block.match(/^(---\n[\s\S]*?\n---\n)/);
}

// 1. Fix multiple spaces after heading hashes (MD019) preserving rest of line
block = block.replace(/^(#{1,6})\s{2,}([^\n]+)/gm, (_, hashes, rest) => `${hashes} ${rest}`);

// 2. Convert leading asterisk list markers to dash (MD004) and normalize indentation (MD007)
block = block.replace(/^(\s*)\*\s+/gm, (_, indent) => `${indent.replace(/ /g,'')}- `);
block = block.replace(/^[ \t]+-\s+/gm, '- ');

// 3. Ensure fenced code blocks have a language (MD040)
block = block.replace(/^```(?=\n)/gm, '```ts');

// 4. Unwrap bullet-wrapped code example blocks produced by TypeDoc pruning (e.g. '* ```ts')
// We'll do a more robust line-by-line pass that also handles the "Example usage:" label.
const lines = block.split('\n');
let inExampleStarBlock = false;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (/^\s*\* Example usage:/.test(line)) {
    // ensure a blank line before (if previous non-blank not already blank)
    if (i > 0 && lines[i-1].trim() !== '') {
      lines.splice(i, 0, '');
      i++;
    }
    lines[i] = 'Example usage:'; // replace the star bullet label
    inExampleStarBlock = true;
    continue;
  }
  if (inExampleStarBlock) {
    if (/^\s*\*\s+```/.test(line)) {
      // opening or closing fence line inside example block
      const fenceLang = line.replace(/^\s*\*\s+```?/, '').trim();
      if (fenceLang === '' || fenceLang === '```') {
        lines[i] = '```ts';
      } else if (fenceLang.startsWith('ts')) {
        lines[i] = '```ts';
      } else {
        lines[i] = '```' + fenceLang.replace(/^`+/, '');
      }
      continue;
    }
    if (/^\s*\*\s+```/.test(line)) continue; // safety
    if (/^\s*\*\s+/.test(line)) {
      // ordinary code/comment/content line within example block
      const stripped = line.replace(/^\s*\*\s+/, '');
      lines[i] = stripped;
      continue;
    }
    // Reached a line not starting with '* ' => close example block if we were in one
    if (inExampleStarBlock) {
      inExampleStarBlock = false;
    }
  }
}
block = lines.join('\n');

// 5. (Heading double space already handled by generic rule; keep legacy specific just in case)
block = block.replace(/^####\s{2,}Prisma Client/m, '#### Prisma Client');

// 6. Surround fenced code blocks with blank lines (MD031)
block = block
  .replace(/([^\n])\n```(\w*)\n/g, (m, prev, lang) => `${prev}\n\n\`\`\`${lang}\n`)
  .replace(/```(\w*)\n([\s\S]*?)```(\n[^\n])/g, (m, lang, inner, next) => `\`\`\`${lang}\n${inner}\`\`\`\n${next}`);

// 7. Ensure blank line after raw HTML anchors before next heading (fix MD022)
// Pattern: <a id="something"></a>\n### Heading -> insert an extra \n between
block = block.replace(/(<a id="[^"]+"><\/a>)\n(###\s+)/g, (m, anchor, heading) => `${anchor}\n\n${heading}`);

// 5. Trim any trailing whitespace on lines
block = block.replace(/[ \t]+$/gm, '');

// 7. Stabilize GitHub source links: replace commit-specific blob hashes with HEAD so docs don't churn each commit.
// Example: https://github.com/org/repo/blob/3ef2c5d9bef761a03025df6b8767642077c87fd2/path -> .../blob/HEAD/path
// This keeps links valid while ensuring deterministic doc generation for ci:full:strict clean-tree verification.
block = block.replace(/(\/blob\/)[0-9a-f]{7,40}\//g, '$1HEAD/');

// 8. Normalize horizontal rules: canonicalize to '---' (markdownlint MD035 default) for deterministic style.
// Preserve YAML frontmatter (first block) by capturing earlier; we only transform lines consisting solely of *** or ----.
block = block.replace(/^\*\*\*\s*$/gm, '---');
block = block.replace(/^----\s*$/gm, '---');

// 9. Remove superfluous blank lines immediately after markdownlint-disable blocks and before the first content line
// to reduce churn where a generator sometimes adds an empty line.
block = block.replace(/(markdownlint-disable[^\n]*\n)\n+/g, '$1');

// 10. Likewise trim blank lines just before markdownlint-enable markers.
block = block.replace(/\n+((?:<!--\s*markdownlint-enable))/g, '\n$1');

// 11. Collapse any sequence of more than two blank lines overall to at most one (avoid vertical drift)
block = block.replace(/\n{3,}/g, '\n\n');

// 12. Unescape prisma `node_modules` path underscores that occasionally toggle (ensure single representation)
block = block.replace(/node\\_modules/g, 'node_modules');

// 12b. Replace any lingering blob commit hashes missed by earlier pattern (case-insensitive safety)
block = block.replace(/(blob)\/[0-9a-f]{7,40}\//gi, '$1/HEAD/');

// 13. Ensure a blank line before and after every horizontal rule (---) except at file boundaries
block = block.replace(/([^\n])\n---\n([^\n])/g, (m, a, b) => `${a}\n\n---\n\n${b}`);
// Collapse any over-correction
block = block.replace(/\n{3,}/g, '\n\n');

// Reinsert preserved frontmatter block exactly as captured (avoid transformation to *** etc.)
if (frontmatterMatch) {
  const preserved = frontmatterMatch[1];
  // Remove any transformed first section up to first heading and replace with preserved frontmatter
  block = block.replace(/^(?:\*\*\*\n)?title: API Reference \(Stub\)\n(?:\*\*\*\n)?/, '');
  // Prepend preserved frontmatter if it's not already there
  if (!block.startsWith(preserved)) {
    block = preserved + block.replace(/^\n+/, '');
  }
}

const updated = block;
if (updated !== content) {
  fs.writeFileSync(target, updated, 'utf8');
  console.log('postprocess-api-md: applied cleanup');
} else {
  console.log('postprocess-api-md: no changes needed');
}
