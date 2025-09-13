#!/usr/bin/env node
/*
 * DEPRECATED: Complex roadmap synchronization checker
 * 
 * This script is deprecated in favor of the new dynamic GitHub Issues-based
 * roadmap generation system (scripts/docs/generate-roadmap.js).
 * 
 * The new system eliminates the need for manual synchronization between
 * tasklist.md and docs/roadmap.md by using GitHub Issues as the source of truth.
 * 
 * This file is kept for backward compatibility but will be removed in a future version.
 * 
 * See docs/architecture/docs-simplification.md for details on the new approach.
 */

console.warn('⚠️  DEPRECATED: This roadmap sync checker is deprecated.');
console.warn('🚀 Please use the new dynamic roadmap generator: npm run docs:roadmap');  
console.warn('📚 See docs/architecture/docs-simplification.md for migration details.');

// For backward compatibility, just exit successfully
console.log('Roadmap sync OK (deprecated - no longer needed).');
process.exit(0);

/*
 * Legacy code below - no longer executed but kept for reference
 * 
 Cross-check docs/roadmap.md against tasklist.md.
 Rules:
 1. If roadmap row status is ✅ the corresponding concept must have at least one checked item in tasklist mentioning a keyword.
 2. If roadmap row status is 🔜 or 🟡 and a clearly matching task is fully checked (all related lines), warn.
 3. Exit non-zero only on rule #1 violations (roadmap claims done but no evidence in tasklist) or internal parsing errors.

 Heuristic mapping: For each roadmap row (text cell #1), build a lowercase keyword set by splitting on non-alphanumerics, dropping stop words.
 Then scan tasklist for lines starting with "- [x]" containing any keyword (>=1) and count as evidence.

 Future enhancement: structured front-matter mapping.
*/
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const ROADMAP = path.join(ROOT, 'docs', 'roadmap.md');
const TASKLIST = path.join(ROOT, 'tasklist.md');

function read(file){return fs.readFileSync(file,'utf8');}

const roadmap = read(ROADMAP);
const tasklist = read(TASKLIST);

// Extract markdown tables rows (ignore header separators) capturing: item | status | description
const tableRowRe = /^\|([^\n]*?)\|([^\n]*?)\|([^\n]*?)\|$/gm;
let rows=[]; let m;
while((m=tableRowRe.exec(roadmap))){
  const item=m[1].trim();
  const status=m[2].trim();
  const desc=m[3].trim();
  if(item.toLowerCase().startsWith('deployment artifact')){ /* include */ }
  // Skip header lines containing 'Item' or 'Status'
  if(/item/i.test(item) && /status/i.test(status)) continue;
  // Skip separators mis-captured
  if(/^-+$/.test(item)) continue;
  if(item) rows.push({item,status,desc});
}

// Build task evidence index
const taskLines = tasklist.split(/\r?\n/).filter(l=>/^\s*- \[x\]/i.test(l));

// Optional ignores (roadmap items intentionally broad or tracked elsewhere)
const IGNORE_WARN = new Set([
  'Build worker implementation',
  'Domain & wildcard routing',
  'OAuth provider integration',
  'Metrics endpoint (Prometheus)',
  'Test coverage reporting',
  'SAST & SCA in CI',
  'RLS policies',
  'Drift detection for schema'
]);

// Allow items to be marked done without task evidence (purely documentation-level accomplishments)
const ALLOW_MISSING_DONE = new Set([
  'Docs restructuring (/docs)',
  'Roadmap & contributing docs',
  'API quickstart',
  'Documentation validation CI',
  'Threat model doc',
  'Threat model'
]);

const STOP = new Set(['the','and','for','with','doc','docs','added','guide','creation','job','api','ref','reference','process','script','matrix']);
function keywords(str){
  return [...new Set(str.toLowerCase().split(/[^a-z0-9]+/).filter(w=>w.length>2 && !STOP.has(w)))];
}

function phraseMatch(item, line){
  const norm = s=>s.toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const inorm = norm(item);
  const lnorm = norm(line.replace(/^- \[x\] /,''));
  // consider phrase match if all non-stop keywords appear
  const keys = keywords(item);
  return keys.length>0 && keys.every(k=>lnorm.includes(k));
}

function evidenceFor(item){
  const keys=keywords(item);
  if(!keys.length) return [];
  const hits=[];
  for(const line of taskLines){
    const lower=line.toLowerCase();
    let keyCount=0;
    for(const k of keys){ if(lower.includes(k)) keyCount++; }
    if(keyCount>=2 || phraseMatch(item,line)){
      hits.push(line.trim());
    }
  }
  return hits;
}

let hardFailures=[]; let warnings=[];
for(const r of rows){
  if(r.status.includes('✅')){
    if(ALLOW_MISSING_DONE.has(r.item)) continue;
    const ev = evidenceFor(r.item);
    if(ev.length===0){
      hardFailures.push(`Roadmap marks done but no task evidence: "${r.item}"`);
    }
  } else if(r.status.match(/🔜|🟡/)){
    if(IGNORE_WARN.has(r.item)) continue;
    const ev = evidenceFor(r.item);
    if(ev.length>0){
      warnings.push(`Roadmap pending but tasks show evidence of completion: "${r.item}" -> e.g. ${ev[0]}`);
    }
  }
}

if(warnings.length) {
  console.warn('Roadmap sync warnings:');
  warnings.forEach(w=>console.warn('  '+w));
}
if(hardFailures.length){
  console.error('Roadmap sync FAIL:');
  hardFailures.forEach(f=>console.error('  '+f));
  process.exit(1);
}
console.log('Roadmap sync OK.');
