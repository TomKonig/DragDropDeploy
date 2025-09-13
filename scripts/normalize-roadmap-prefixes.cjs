#!/usr/bin/env node
/**
 * normalize-roadmap-prefixes.cjs
 * After legacy label removal, convert existing title prefixes [legacy-slug]
 * to canonical slugs using mapping JSON.
 * Usage:
 *   node scripts/normalize-roadmap-prefixes.cjs --map scripts/roadmap-slug-map.json [--apply]
 */
const { execSync } = require('child_process');
const fs = require('fs');
function sh(c){ return execSync(c,{stdio:['ignore','pipe','pipe']}).toString(); }
const args = process.argv;
const mapIdx = args.indexOf('--map');
if(mapIdx===-1) { console.error('Missing --map path'); process.exit(1);} 
const mapPath = args[mapIdx+1];
const mapping = JSON.parse(fs.readFileSync(mapPath,'utf8'));
const dry = !args.includes('--apply');
const yaml = JSON.parse(JSON.stringify(mapping)); // not used but placeholder
const issues = JSON.parse(sh("gh issue list --limit 500 --json number,title,labels"));
let planned=0, renamed=0;
for(const issue of issues){
  if(!issue.labels.some(l=> l.name==='roadmap')) continue;
  const m = issue.title.match(/^\[(.+?)\]\s*/);
  if(!m) continue; // no prefix
  const oldSlug = m[1];
  const newSlug = mapping[oldSlug];
  if(!newSlug || newSlug===oldSlug) continue;
  const newTitle = issue.title.replace(/^\[[^\]]+\]/, `[${newSlug}]`);
  if(dry){
    console.log(`[plan] #${issue.number} ${oldSlug} -> ${newSlug}`);
    planned++;
  } else {
    try { sh(`gh issue edit ${issue.number} --title ${JSON.stringify(newTitle)}`); renamed++; }
    catch(e){ console.error('Rename failed', issue.number, e.message); }
  }
}
if(dry){
  console.log(`Planned renames: ${planned}`);
}else{
  console.log(`Applied renames: ${renamed}`);
}
