#!/usr/bin/env node
/**
 * cleanup-roadmap-orphans.cjs
 * Removes roadmap title prefixes that are NOT in roadmap.yaml canonical set.
 * Strategy:
 *  - Load YAML slugs
 *  - List issues with roadmap label
 *  - If title has prefix [slug] and slug not in YAML -> strip prefix (leave rest of title)
 *  - Optionally remove roadmap label if you want only canonical tracked items to keep it (flag --drop-label)
 *  - Dry run by default; --apply to execute.
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
function sh(c){ return execSync(c,{stdio:['ignore','pipe','pipe']}).toString(); }
const dry = !process.argv.includes('--apply');
const drop = process.argv.includes('--drop-label');
const yamlRaw = fs.readFileSync(path.join(__dirname,'..','roadmap.yaml'),'utf8');
const YAML = require('yaml');
const yaml = YAML.parse(yamlRaw);
const canonical = new Set(Object.values(yaml.categories).flatMap(c=> c.items.map(i=> i.slug)));
const issues = JSON.parse(sh("gh issue list --limit 500 --json number,title,labels"));
let planned=0, changed=0, labelRemoved=0;
for(const issue of issues){
  if(!issue.labels.some(l=> l.name==='roadmap')) continue;
  const m = issue.title.match(/^\[(.+?)\]\s*/);
  if(!m) continue;
  const slug = m[1];
  if(canonical.has(slug)) continue; // keep
  const newTitle = issue.title.replace(/^\[[^\]]+\]\s*/, '');
  if(dry){
    console.log(`[orphan] #${issue.number} ${slug} -> strip prefix`);
    planned++;
  } else {
    try { sh(`gh issue edit ${issue.number} --title ${JSON.stringify(newTitle)}`); changed++; } catch(e){ console.error('Title change failed', issue.number, e.message); }
    if(drop){
      try { sh(`gh issue edit ${issue.number} --remove-label roadmap`); labelRemoved++; } catch(e){ console.error('Label remove failed', issue.number, e.message); }
    }
  }
}
if(dry){
  console.log(`Planned orphan strips: ${planned}`);
}else{
  console.log(`Applied: titles changed ${changed}, labels removed ${labelRemoved}`);
}
