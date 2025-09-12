#!/usr/bin/env node
/**
 * validate-roadmap.cjs
 * Validates roadmap consistency; exits non-zero if problems.
 * Conditions:
 *  - Missing canonical slugs
 *  - Orphan prefixed issues (slugs not in canonical list)
 *  - Duplicate canonical slug assignments (>1 issue with same slug)
 */
const fs = require('fs');
const path = require('path');
const YAML = require('yaml');
const { execSync } = require('child_process');
function sh(c){ return execSync(c,{stdio:['ignore','pipe','pipe']}).toString(); }
const yamlRaw = fs.readFileSync(path.join(__dirname,'..','roadmap.yaml'),'utf8');
const roadmap = YAML.parse(yamlRaw);
const canonical = Object.values(roadmap.categories).flatMap(c=> c.items.map(i=> i.slug));
const issues = JSON.parse(sh("gh issue list --label roadmap --limit 500 --json number,title,state"));
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
const missing = canonical.filter(s=> !map.has(s));
const orphans = Array.from(map.keys()).filter(s=> !canonical.includes(s));
let problems = 0;
if(missing.length){ console.error('Missing slugs:', missing.join(', ')); problems++; }
if(orphans.length){ console.error('Orphan slugs:', orphans.join(', ')); problems++; }
if(duplicates.size){ console.error('Duplicate slugs:', Array.from(duplicates).join(', ')); problems++; }
if(problems){
  console.error('Roadmap validation FAILED');
  process.exit(1);
}else{
  console.log('Roadmap validation OK');
}
