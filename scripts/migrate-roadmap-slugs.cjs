#!/usr/bin/env node
/**
 * migrate-roadmap-slugs.cjs
 *
 * Option 2 migration: Move from verbose auto-generated roadmap labels to concise canonical slugs
 * defined in roadmap.yaml. For each canonical slug, we attempt to find a best match existing issue
 * (by fuzzy containment of keywords) OR leave it missing. Then we relabel the issue by:
 *   1. Adding `roadmap:<newSlug>`
 *   2. (Optionally) Removing the old verbose roadmap label if it maps uniquely
 *
 * Supports dry-run (default) and --apply to execute changes.
 *
 * Heuristic mapping approach:
 *  - For each canonical slug, compute candidate issues where ANY token of the slug appears
 *    in existing verbose roadmap labels (after splitting on '-')
 *  - Score by token overlap count (descending) then by lowest issue number (stable selection)
 *  - If score = 0, leave unmapped (still MISSING after migration)
 *  - Skip if an issue already has the exact `roadmap:<newSlug>` label
 *
 * Future refinement: allow a manual override mapping file.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const YAML = require('yaml');

function sh(cmd){
  return execSync(cmd,{stdio:['ignore','pipe','pipe']}).toString();
}

function loadYaml(){
  const p = path.join(__dirname,'..','roadmap.yaml');
  const raw = fs.readFileSync(p,'utf8');
  return YAML.parse(raw);
}

function getIssues(){
  const json = sh("gh issue list --limit 500 --json number,title,labels,state");
  return JSON.parse(json);
}

function tokenize(s){
  return s.split(/[-_\s]+/).filter(Boolean);
}

function mapSlugs(yaml, issues){
  const existing = [];
  for(const issue of issues){
    for(const l of issue.labels){
      if(l.name.startsWith('roadmap:')) existing.push({issue,label:l.name});
    }
  }
  const existingLabelEntries = existing.filter(e=>!yamlSlugSet.has(e.label.slice(8)));
  const mappings = [];
  for(const slug of yamlSlugSet){
    // Already satisfied?
    const already = existing.find(e=> e.label === 'roadmap:'+slug);
    if(already){
      mappings.push({slug, status:'already-present', issue:already.issue});
      continue;
    }
    const slugTokens = tokenize(slug);
    // candidate existing verbose labels
    const candidates = existingLabelEntries.map(e=>{
      const tokens = tokenize(e.label.slice(8));
      const overlap = slugTokens.filter(t=> tokens.includes(t)).length;
      return { ...e, overlap };
    }).filter(c=> c.overlap>0);
    if(!candidates.length){
      mappings.push({slug, status:'unmapped'});
      continue;
    }
    candidates.sort((a,b)=> b.overlap - a.overlap || a.issue.number - b.issue.number);
    const winner = candidates[0];
    mappings.push({slug, status:'map', from:winner.label, issue:winner.issue});
  }
  return mappings;
}

const yaml = loadYaml();
const issues = getIssues();
const yamlSlugSet = new Set(Object.values(yaml.categories).flatMap(c=> c.items.map(i=> i.slug)));
const mappings = mapSlugs(yaml, issues);

const dry = !process.argv.includes('--apply');

if(dry){
  console.log('Dry run (use --apply to execute).');
}

let addOps=0, removeOps=0;
for(const m of mappings){
  if(m.status==='already-present'){
    console.log(`[keep] ${m.slug} -> issue #${m.issue.number}`);
  } else if(m.status==='unmapped'){
    console.log(`[missing] ${m.slug}`);
  } else if(m.status==='map'){
    console.log(`[map] ${m.from} => roadmap:${m.slug} (issue #${m.issue.number})`);
    addOps++;
  }
}

if(!dry){
  for(const m of mappings){
    if(m.status==='map'){
      try {
        sh(`gh issue edit ${m.issue.number} --add-label roadmap:${m.slug}`);
        // remove old label if distinct
        if(m.from !== 'roadmap:'+m.slug){
          sh(`gh issue edit ${m.issue.number} --remove-label ${m.from}`);
          removeOps++;
        }
      } catch(e){
        console.error('Error editing issue', m.issue.number, e.stderr?.toString()||e.message);
      }
    }
  }
  console.log(`Applied. Added ${addOps} labels, removed ${removeOps} old labels.`);
} else {
  console.log(`Planned add ops: ${addOps}, potential removals: (<= add ops).`);
}
