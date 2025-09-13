#!/usr/bin/env node
/**
 * migrate-roadmap-titles.cjs
 *
 * Transition from per-slug labels (roadmap:<slug>) to single `roadmap` label plus
 * issue title prefix `[slug]`.
 *
 * Behavior:
 *  - For each issue with a legacy `roadmap:<slug>` label:
 *      * If title already starts with `[slug]`, do nothing to title.
 *      * Else prepend `[slug] ` to existing title.
 *      * Add `roadmap` label if missing.
 *      * (Optionally) remove the specific `roadmap:<slug>` label when --apply specified.
 *  - Issues with `roadmap` and no prefix but having old label: same treatment.
 *  - Dry run by default; pass --apply to execute.
 * Mapping Mode (--canonical-map path):
 *  - Provide a JSON mapping of legacySlug -> canonicalSlug.
 *  - If an issue title prefix matches a key, replace prefix with canonical.
 *  - If multiple legacy slugs map to same canonical, all converge.
 *  - With --strip-unmapped, remove prefix from titles whose slug not in YAML nor mapping (housekeeping).
 */

const { execSync } = require('child_process');

function sh(cmd){
  return execSync(cmd,{stdio:['ignore','pipe','pipe']}).toString();
}

function getIssues(){
  const json = sh("gh issue list --limit 500 --json number,title,labels,state");
  return JSON.parse(json);
}

const dry = !process.argv.includes('--apply');

const issues = getIssues();
let mapping = null;
const mapArgIdx = process.argv.indexOf('--canonical-map');
if(mapArgIdx !== -1 && process.argv[mapArgIdx+1]){
  const fs = require('fs');
  const p = process.argv[mapArgIdx+1];
  mapping = JSON.parse(fs.readFileSync(p,'utf8'));
}
const stripUnmapped = process.argv.includes('--strip-unmapped');
let planned=0, renamed=0, addedLabel=0, removedLegacy=0;
for(const issue of issues){
  const legacy = issue.labels.filter(l=> l.name.startsWith('roadmap:'));
  if(!legacy.length) continue;
  // pick first legacy slug (if multiple, treat each sequentially)
  for(const leg of legacy){
    const slug = leg.name.slice(8);
    // existing prefix detection (any slug)
    const prefixMatch = issue.title.match(/^\[(.+?)\]\s*/);
    let currentPrefix = prefixMatch ? prefixMatch[1] : null;
    let newTitle = issue.title;
    if(!currentPrefix){
      // add legacy prefix first
      newTitle = `[${slug}] ${issue.title}`;
      currentPrefix = slug;
    }
    // Mapping replacement
    if(mapping && mapping[currentPrefix]){
      newTitle = issue.title.replace(/^\[[^\]]+\]\s*/, `[${mapping[currentPrefix]}] `);
    } else if(mapping && stripUnmapped){
      // remove unmatched prefix entirely
      if(prefixMatch && !mapping[currentPrefix]){
        newTitle = issue.title.replace(/^\[[^\]]+\]\s*/, '');
      }
    }
    const hasPrefix = /^\[[^\]]+\]/.test(newTitle);
    const hasUnified = issue.labels.some(l=> l.name==='roadmap');
    if(dry){
      console.log(`[plan] #${issue.number} title${newTitle===issue.title?'=nochange':'=update'} ${hasUnified? '':'add-roadmap-label'} remove ${leg.name}`);
      planned++;
    } else {
      if(newTitle!==issue.title){
        try { sh(`gh issue edit ${issue.number} --title ${JSON.stringify(newTitle)}`); renamed++; } catch(e){ console.error('Title update failed', issue.number, e.message); }
      }
      if(!hasUnified){
        try { sh(`gh issue edit ${issue.number} --add-label roadmap`); addedLabel++; } catch(e){ console.error('Add roadmap label failed', issue.number, e.message); }
      }
      try { sh(`gh issue edit ${issue.number} --remove-label ${leg.name}`); removedLegacy++; } catch(e){ console.error('Remove legacy label failed', issue.number, e.message); }
    }
  }
}

if(dry){
  console.log(`Planned transformations: ${planned}`);
}else{
  console.log(`Applied: renamed ${renamed}, added roadmap label ${addedLabel}, removed legacy labels ${removedLegacy}`);
}
