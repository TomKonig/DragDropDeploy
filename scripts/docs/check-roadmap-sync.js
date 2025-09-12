#!/usr/bin/env node
/**
 * check-roadmap-sync.js
 * Validates docs/roadmap.md table alignment with canonical roadmap.yaml + GitHub issues.
 * Rules (exit non-zero on first two classes):
 *  1. Every canonical slug in roadmap.yaml must appear exactly once as a [slug] issue title with roadmap label.
 *  2. docs/roadmap.md must contain each canonical slug at least once in the first column (item cell).
 *  3. Warn (do not fail) if docs/roadmap.md references a slug not in roadmap.yaml (stale / orphan doc entry).
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.join(__dirname, '..', '..');
const ROADMAP_MD = path.join(ROOT, 'docs', 'roadmap.md');
const ROADMAP_YAML = path.join(ROOT, 'roadmap.yaml');

function read(p){ return fs.readFileSync(p,'utf8'); }
function sh(c){ return execSync(c,{stdio:['ignore','pipe','pipe']}).toString(); }

if(!fs.existsSync(ROADMAP_YAML)){
  console.log('No roadmap.yaml present; skipping.');
  process.exit(0);
}
if(!fs.existsSync(ROADMAP_MD)){
  console.error('docs/roadmap.md missing.');
  process.exit(1);
}

const yaml = require('yaml');
const yamlDoc = yaml.parse(read(ROADMAP_YAML));
const canonical = new Set(Object.values(yamlDoc.categories).flatMap(c=> c.items.map(i=> i.slug)));

// Extract slugs present in docs table first column (simple bracket or text containing slug)
const md = read(ROADMAP_MD);
const rowRe = /^\|([^|]+)\|/gm; // first cell
const docSlugs = new Set();
let m;
for(; (m=rowRe.exec(md));){
  const cell = m[1].trim();
  // Collect bare slug if it exactly matches canonical; also detect [slug]
  const bracket = cell.match(/\[([a-z0-9-]+)\]/i);
  if(bracket){ docSlugs.add(bracket[1]); continue; }
  if(canonical.has(cell)) docSlugs.add(cell);
}

// Query GitHub issues for roadmap label (token fallback: GH_TOKEN || GITHUB_TOKEN)
let issues = [];
const ghToken = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
if(!ghToken){
  console.warn('No GH_TOKEN/GITHUB_TOKEN provided; skipping GitHub issue validation (will not fail).');
} else {
  // Ensure gh CLI sees token
  const envExport = `export GH_TOKEN='${ghToken.replace(/'/g,"'\\''")}'`;
  try {
    issues = JSON.parse(sh(`${envExport} && gh issue list --label roadmap --limit 500 --json number,title,labels,state`));
  } catch(e){
    console.warn('Warning: gh issue list failed, skipping issue validation:', e.message);
  }
}

const slugFromTitle = t => (t.match(/^\[([^\]]+)\]/) || [])[1];
const issueMap = new Map();
for(const is of issues){
  const slug = slugFromTitle(is.title);
  if(!slug) continue;
  if(!issueMap.has(slug)) issueMap.set(slug, []);
  issueMap.get(slug).push(is);
}

const missingIssues = issues.length ? [...canonical].filter(s=> !issueMap.has(s)) : [];
const duplicateIssues = issues.length ? [...issueMap.entries()].filter(([s,list])=> list.length>1 && canonical.has(s)).map(([s])=>s) : [];
const missingDoc = [...canonical].filter(s=> !docSlugs.has(s));
const docOrphans = [...docSlugs].filter(s=> !canonical.has(s));

let fail=false;
if(missingIssues.length){
  console.error('Missing issue(s) for canonical slug(s):', missingIssues.join(', '));
  fail=true;
}
if(duplicateIssues.length){
  console.error('Duplicate issue(s) for slug(s):', duplicateIssues.join(', '));
  fail=true;
}
if(missingDoc.length){
  console.error('docs/roadmap.md missing slug row(s):', missingDoc.join(', '));
  fail=true;
}
if(docOrphans.length){
  console.warn('Orphan slug(s) in docs/roadmap.md (not in roadmap.yaml):', docOrphans.join(', '));
}

if(fail){
  process.exit(1);
}
console.log('Roadmap documentation sync OK.');
