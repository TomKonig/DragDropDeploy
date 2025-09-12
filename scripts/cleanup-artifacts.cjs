#!/usr/bin/env node
/*
 * Cleanup artifacts script.
 * Safe by default (dry run unless --force or no --dry-run flag specified?).
 * Behavior:
 *  - Deletes root-level *.tgz tarballs (likely leftover manual package fetches)
 *  - Deletes workspace dist folders (backend/dist, frontend/dist, shared/dist)
 *  - Optionally deletes tsbuildinfo files if --include-tsbuildinfo provided
 *  - Optionally deletes coverage directories if present
 *  - Supports --dry-run (default) to list planned deletions
 * Usage:
 *    node scripts/cleanup-artifacts.cjs --dry-run
 *    node scripts/cleanup-artifacts.cjs --yes            # perform deletions
 *    node scripts/cleanup-artifacts.cjs --yes --include-tsbuildinfo
 */

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');

function parseArgs() {
  const args = process.argv.slice(2);
  const flags = new Set();
  for (const a of args) flags.add(a);
  return {
    dryRun: flags.has('--dry-run') || !flags.has('--yes'),
    includeTsBuildInfo: flags.has('--include-tsbuildinfo'),
    includeCoverage: flags.has('--include-coverage'),
  };
}

function exists(p) { try { fs.accessSync(p); return true; } catch (_) { return false; } }

function statSize(p) { try { return fs.statSync(p).size; } catch { return 0; } }

function collect() {
  const targets = [];
  // Root tarballs
  for (const entry of fs.readdirSync(repoRoot)) {
    if (entry.endsWith('.tgz')) {
      targets.push(path.join(repoRoot, entry));
    }
  }
  // Workspace dist folders
  ['backend', 'frontend', 'shared'].forEach(dir => {
    const distPath = path.join(repoRoot, dir, 'dist');
    if (exists(distPath)) targets.push(distPath);
  });
  // Coverage directories
  if (exists(path.join(repoRoot, 'coverage'))) targets.push(path.join(repoRoot, 'coverage'));
  ['backend', 'frontend', 'shared'].forEach(dir => {
    const cov = path.join(repoRoot, dir, 'coverage');
    if (exists(cov)) targets.push(cov);
  });
  // tsbuildinfo (optional)
  if (args.includeTsBuildInfo) {
    function scanTsBuildInfo(dir) {
      for (const entry of fs.readdirSync(dir)) {
        const full = path.join(dir, entry);
        if (entry.endsWith('.tsbuildinfo')) targets.push(full);
        else if (fs.statSync(full).isDirectory() && !['node_modules', '.git'].includes(entry)) {
          // shallow scan only two levels deep to avoid cost
          for (const entry2 of fs.readdirSync(full)) {
            const full2 = path.join(full, entry2);
            if (entry2.endsWith('.tsbuildinfo')) targets.push(full2);
          }
        }
      }
    }
    scanTsBuildInfo(repoRoot);
  }
  return targets;
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  const units = ['KB','MB','GB'];
  let u = -1; let v = bytes;
  do { v /= 1024; u++; } while (v >= 1024 && u < units.length - 1);
  return v.toFixed(1) + ' ' + units[u];
}

function folderSize(dir) {
  let total = 0;
  function walk(p) {
    try {
      const st = fs.statSync(p);
      if (st.isFile()) total += st.size;
      else if (st.isDirectory()) {
        for (const child of fs.readdirSync(p)) walk(path.join(p, child));
      }
    } catch (_) { /* ignore */ }
  }
  walk(dir);
  return total;
}

const args = parseArgs();
const targets = collect();

if (!targets.length) {
  console.log('No cleanup targets found.');
  process.exit(0);
}

let reclaimBytes = 0;
for (const t of targets) {
  const size = fs.existsSync(t) ? (fs.statSync(t).isDirectory() ? folderSize(t) : statSize(t)) : 0;
  reclaimBytes += size;
  console.log(`${args.dryRun ? '[dry-run] would remove' : 'remove'}: ${path.relative(repoRoot, t)} (${formatSize(size)})`);
  if (!args.dryRun) {
    try {
      if (fs.statSync(t).isDirectory()) fs.rmSync(t, { recursive: true, force: true });
      else fs.unlinkSync(t);
    } catch (e) {
      console.warn('Failed to remove', t, e.message);
    }
  }
}

console.log(`${args.dryRun ? 'Potential' : 'Actual'} space reclaimed: ${formatSize(reclaimBytes)}`);

if (args.dryRun) {
  console.log('Run again with --yes to perform deletions.');
}
