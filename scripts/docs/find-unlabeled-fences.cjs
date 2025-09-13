#!/usr/bin/env node
/**
 * find-unlabeled-fences.cjs
 * Scans the docs/ tree for fenced code blocks missing a language (violates MD040) excluding
 * configured ignore directories. Pure Node (no grep) to avoid shell quoting pitfalls with ``` patterns.
 * Output format: <file>:<line>: unlabeled fence
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const DOCS_ROOT = path.join(ROOT, 'docs');
const IGNORE_DIRS = new Set([
  path.join(DOCS_ROOT, '.generated'),
]);

let count = 0;
let filesScanned = 0;
const start = Date.now();
const MAX_FILE_BYTES = 512 * 1024; // 512KB safety guard

function scan(filePath) {
  const rel = path.relative(ROOT, filePath);
  let buf;
  try {
    const stat = fs.statSync(filePath);
    if (stat.size > MAX_FILE_BYTES) {
      console.error(`${rel}: skipped (>${MAX_FILE_BYTES} bytes)`);
      return;
    }
    buf = fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    console.error(`${rel}: read error ${e.message}`);
    return;
  }
  const lines = buf.split(/\n/);
  let inFence = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const m = line.match(/^```(.*)$/);
    if (m) {
      const lang = m[1].trim();
      if (!inFence) {
        // opening
        if (!lang) {
          console.log(`${rel}:${i + 1}: unlabeled fence`);
          count++;
        }
        inFence = true;
      } else {
        // closing (language may be present erroneously, still close)
        inFence = false;
      }
    }
  }
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full);
    else if (full.endsWith('.md')) scan(full);
  }
}

if (!fs.existsSync(DOCS_ROOT)) {
  console.error('docs directory missing');
  process.exit(1);
}

function walkAll(dir) {
  if (IGNORE_DIRS.has(dir)) return;
  let entries;
  try {
    entries = fs.readdirSync(dir).sort();
  } catch (e) {
    console.error(`Cannot read directory ${dir}: ${e.message}`);
    return;
  }
  process.stderr.write(`[scan] ${path.relative(ROOT, dir)} (entries: ${entries.length})\n`);
  for (const entry of entries) {
    const full = path.join(dir, entry);
    let stat;
    try { stat = fs.lstatSync(full); } catch { continue; }
    if (stat.isSymbolicLink()) continue; // skip symlinks
    if (stat.isDirectory()) {
      walkAll(full);
    } else if (full.endsWith('.md')) {
      filesScanned++;
      scan(full);
    }
  }
}

walkAll(DOCS_ROOT);
const durationMs = Date.now() - start;
if (count === 0) {
  console.log(`No unlabeled fences found. (files: ${filesScanned}, time: ${durationMs}ms)`);
  process.exit(0);
} else {
  console.error(`Found ${count} unlabeled fenced code block(s). (files: ${filesScanned}, time: ${durationMs}ms)`);
  process.exit(1);
}