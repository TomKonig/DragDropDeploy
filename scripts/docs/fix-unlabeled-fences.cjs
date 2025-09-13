#!/usr/bin/env node
/**
 * fix-unlabeled-fences.cjs
 * Adds language identifiers to unlabeled fenced code blocks (MD040) in docs/reference.
 * Heuristics:
 * - If previous non-blank line starts with '{' or contains JSON-like tokens -> json
 * - If next non-blank line starts with '{' -> json
 * - If any line inside looks like HTTP header (e.g., Authorization:) and short -> http
 * - If first content line starts with '{' -> json
 * - If contains typical shell prompt ($, #!/bin/bash) -> sh
 * - Default fallback: text
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const DOCS_REF = path.join(ROOT, 'docs', 'reference');

function detectLanguage(blockLines) {
  const nonBlank = blockLines.filter(l => l.trim() !== '');
  if (nonBlank.length === 0) return 'text';
  const first = nonBlank[0].trim();
  if (first.startsWith('{') || first.startsWith('[')) return 'json';
  if (/^#!/.test(first)) return 'sh';
  if (/^(GET|POST|PUT|PATCH|DELETE)\s+\//.test(first)) return 'http';
  if (nonBlank.some(l => /^Authorization:/i.test(l))) return 'http';
  if (nonBlank.some(l => /\$\s+/.test(l))) return 'sh';
  return 'text';
}

function processFile(file) {
  const orig = fs.readFileSync(file, 'utf8').split(/\n/);
  const out = [];
  let i = 0; let modified = false;
  while (i < orig.length) {
    const line = orig[i];
    // Normalize any accidental closing fences that have language appended (should not happen) -> strip language
    if (/^```\w+$/.test(line) && (i === 0 || orig[i-1] !== '')) {
      // treat as opening fence already labeled; copy through
      out.push(line); i++; continue;
    }
    if (line === '```') {
      const contentLines = [];
      i++;
      while (i < orig.length && orig[i] !== '```') { contentLines.push(orig[i]); i++; }
      if (i >= orig.length) { // unclosed; output as-is
        out.push('```', ...contentLines);
        break;
      }
      // At closing fence
      const lang = detectLanguage(contentLines);
      out.push('```' + lang);
      out.push(...contentLines);
      out.push('```');
      modified = true;
      i++; // skip closing
      continue;
    }
    // Lines like ```text that appear as stray artifacts immediately after a proper code block closing -> drop them entirely
    if (/^```text$/.test(line)) {
      // If previous line was ``` treat this as duplicate and skip
      if (out[out.length - 1] === '```') {
        modified = true;
        i++; continue; // skip duplicate
      }
      // Otherwise interpret as unlabeled opening (rare) -> change to ```
      out.push('```');
      modified = true;
      i++; continue;
    }
    out.push(line);
    i++;
  }
  if (modified) {
    fs.writeFileSync(file, out.join('\n'), 'utf8');
    console.log('Updated fences in', path.relative(ROOT, file));
  }
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full); else if (full.endsWith('.md')) processFile(full);
  }
}

if (!fs.existsSync(DOCS_REF)) {
  console.error('docs/reference missing');
  process.exit(1);
}

walk(DOCS_REF);