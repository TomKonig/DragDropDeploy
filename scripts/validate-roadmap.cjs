#!/usr/bin/env node
/**
 * validate-roadmap.cjs
 * Policy (2025-09-12): Single generic `roadmap` label + issue title prefix `[slug]` is the authoritative mapping.
 * Legacy per-slug labels `roadmap:<slug>` are tolerated temporarily but not required; they are NOT used here.
 *
 * Validation categories (fail if present):
 *  - Missing: canonical slug (status != done) has no OPEN issue
 *  - Duplicate: >1 issue mapped to same canonical slug
 *  - Orphan: issue slug not present in canonical list
 *  - InvalidStatus: status value not in allowed enum
 *  - FullyClosedNotDone: all issues CLOSED but slug status not marked done (signals YAML should be updated or follow-up issue reopened)
 *  - OpenIssuesForDone: slug marked done but has at least one OPEN issue (inconsistent; either close or revert status)
 *
 * Policy (2025-09-13 refinement):
 *  - Active (non-done) slugs require >=1 OPEN issue.
 *  - Done slugs may have zero issues or only CLOSED issues; any OPEN issue invalidates the done state.
 *  - When all issues close for a non-done slug, update roadmap.yaml to status: done (or create a new follow-up issue).
 */
const fs = require('fs');
const path = require('path');
const YAML = require('yaml');
const { execSync } = require('child_process');
function sh(c){ return execSync(c,{stdio:['ignore','pipe','pipe']}).toString(); }
const yamlRaw = fs.readFileSync(path.join(__dirname,'..','roadmap.yaml'),'utf8');
const roadmap = YAML.parse(yamlRaw);
const canonicalItems = Object.values(roadmap.categories).flatMap(c=> c.items.map(i=> i));
const canonical = canonicalItems.map(i=> i.slug);
let issues = [];
try {
  issues = JSON.parse(sh("gh issue list --label roadmap --limit 500 --json number,title,state"));
} catch (e) {
  console.error('Failed to list GitHub issues (gh CLI). Ensure gh installed & authenticated.');
  process.exit(1);
}
const slugRe = /^\[(.+?)\]/;
const map = new Map();
const duplicates = new Set();
const seen = new Set();
for(const issue of issues){
  const m = issue.title.match(slugRe);
  if(!m) continue; // allow unprefixed if mid-migration
  const slug = m[1];
  if(!map.has(slug)) map.set(slug, []);
  map.get(slug).push(issue);
  if(seen.has(slug)) duplicates.add(slug); else seen.add(slug);
}
const allowedStatuses = new Set(['planned','in-progress','done', undefined]);
const doneSet = new Set(canonicalItems.filter(i=> i.status === 'done').map(i=> i.slug));
const invalidStatus = canonicalItems
  .filter(i=> !allowedStatuses.has(i.status))
  .map(i=> `${i.slug}(${i.status})`);
// Build open/closed maps
const openIssuesBySlug = new Map();
const closedIssuesBySlug = new Map();
for(const [slug, arr] of map.entries()){
  openIssuesBySlug.set(slug, arr.filter(i=> i.state === 'OPEN'));
  closedIssuesBySlug.set(slug, arr.filter(i=> i.state === 'CLOSED'));
}
const missing = canonical.filter(s=> !doneSet.has(s) && (!openIssuesBySlug.get(s) || openIssuesBySlug.get(s).length === 0));
const orphans = Array.from(map.keys()).filter(s=> !canonical.includes(s));
const fullyClosedNotDone = canonical.filter(s=> !doneSet.has(s) && map.has(s) && (openIssuesBySlug.get(s)||[]).length===0 && (closedIssuesBySlug.get(s)||[]).length>0);
const openIssuesForDone = [...doneSet].filter(s=> (openIssuesBySlug.get(s)||[]).length>0);

const summary = {
  Missing: missing,
  Duplicate: Array.from(duplicates),
  Orphan: orphans,
  InvalidStatus: invalidStatus,
  FullyClosedNotDone: fullyClosedNotDone,
  OpenIssuesForDone: openIssuesForDone
};

const failCategories = Object.entries(summary)
  .filter(([k,v])=> v.length && ['Missing','Duplicate','Orphan','InvalidStatus','FullyClosedNotDone','OpenIssuesForDone'].includes(k));

if(failCategories.length){
  console.error('Roadmap validation FAILED');
  for(const [k,v] of failCategories){
    console.error(` - ${k}: ${v.join(', ')}`);
  }
  process.exit(1);
}

// Log success with counts
console.log('Roadmap validation OK.');
console.log(`Checked ${canonical.length} canonical slugs. Done: ${doneSet.size}. Issues mapped: ${map.size}.`);
if(fullyClosedNotDone.length){
  console.log('Info (FullyClosedNotDone):', fullyClosedNotDone.join(', '));
}
if(openIssuesForDone.length){
  console.log('Info (OpenIssuesForDone):', openIssuesForDone.join(', '));
}
