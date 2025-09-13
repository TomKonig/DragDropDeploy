#!/usr/bin/env node
/**
 * generate-roadmap.cjs (enhanced)
 *
 * Source of truth: roadmap.yaml (categories + ordered slugs).
 * Policy (2025-09-12): Single generic `roadmap` label + issue title prefix `[slug]` is authoritative.
 * Backward compatibility: still detect legacy `roadmap:<slug>` labels only if title lacks a prefix (labels deprecated; do not add new ones).
 * Orphans: title prefix (or legacy label) not present in YAML.
 * Missing: slug in YAML with no matching issue prefix.
 * Duplicates: >1 open issue for slug (allowed but reported).
 *
 * Output inserted between markers in docs/roadmap.md:
 * <!-- AUTO-ROADMAP:START --> ... <!-- AUTO-ROADMAP:END -->
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const YAML = require('yaml');

function sh(cmd){
  return execSync(cmd,{stdio:['ignore','pipe','ignore']}).toString('utf8');
}

function getIssues(){
  const json = sh("gh issue list --limit 500 --json number,title,labels,closedAt,updatedAt,state");
  return JSON.parse(json);
}

function extract(issue){
  const labels = issue.labels.map(l=>l.name);
  const slug = labels.find(l=>l.startsWith('roadmap:'))?.slice('roadmap:'.length) || '';
  const phase = labels.find(l=>l.startsWith('phase:')) || '';
  const type = labels.find(l=>l.startsWith('type:')) || '';
  const scope = labels.find(l=>l.startsWith('scope:')) || '';
  let statusIcon = '🔜';
  if(issue.state==='CLOSED') statusIcon='✅';
  else if(/bug|security/.test(type)){ statusIcon='🟡'; }
  return {slug,number:issue.number,title:issue.title,phase,type,scope,statusIcon,updatedAt:issue.updatedAt};
}

function buildTable(rows){
  const header = '| Slug | Issues | Phase | Type | Scope | Status |';
  const sep = '|------|--------|-------|------|-------|--------|';
  const lines = rows.map(r=>{
    const issueRefs = r.issues.map(i=>`#${i.number}`).join(', ');
    return `| ${r.slug} | ${issueRefs} | ${r.phase} | ${r.type} | ${r.scope} | ${r.status} |`;
  });
  return [header,sep,...lines].join('\n');
}

function insert(md,table){
  const start='<!-- AUTO-ROADMAP:START -->';
  const end='<!-- AUTO-ROADMAP:END -->';
  if(!md.includes(start)){
    return md.trimEnd()+`\n\n${start}\n${table}\n${end}\n`;
  }
  // Use explicit [\s\S] to match any character including newlines (avoid useless escape warnings)
  const regex = new RegExp(`${start}[\\s\\S]*?${end}`);
  return md.replace(regex,`${start}\n${table}\n${end}`);
}

function loadYaml(){
  const p = path.join(__dirname,'..','roadmap.yaml');
  const raw = fs.readFileSync(p,'utf8');
  return YAML.parse(raw);
}

function extractSlugFromIssue(issue){
  const m = issue.title.match(/^\[(.+?)\]/);
  if(m) return m[1];
  const legacy = issue.labels.find(l=> l.name.startsWith('roadmap:'));
  if(legacy) return legacy.name.slice(8);
  return null;
}

function statusFromItem(item){
  // Map YAML status -> icon; fallback to planned 🔜
  switch(item.status){
    case 'done': return '✅';
    case 'in-progress': return '🟡';
    case 'experimental': return '🧪';
    case 'evaluating': return '❓';
    case 'planned':
    default: return '🔜';
  }
}

function aggregate(issues, yaml){
  const bySlug = new Map();
  for(const issue of issues){
    const slug = extractSlugFromIssue(issue);
    if(!slug) continue;
    if(!bySlug.has(slug)) bySlug.set(slug,[]);
    bySlug.get(slug).push(issue);
  }
  const rows=[]; const duplicates=[]; const missing=[]; const orphan=[];
  const yamlSlugs = new Set();
  for(const catKey of Object.keys(yaml.categories)){
    const cat = yaml.categories[catKey];
    for(const item of cat.items){
      yamlSlugs.add(item.slug);
      const linked = bySlug.get(item.slug) || [];
      const isDone = item.status === 'done';
      if(linked.length===0 && !isDone) missing.push(item.slug);
      if(linked.length>1) duplicates.push(item.slug);
      // Derive meta from first issue, but prefer YAML status mapping
      let phase=''; let type=''; let scope='';
      if(linked.length){
        const ex = extract(linked[0]);
        phase = ex.phase.replace('phase:','');
        type = ex.type.replace('type:','');
        scope = ex.scope.replace('scope:','');
      }
      const status = statusFromItem(item);
      rows.push({ slug:item.slug, issues: linked.map(i=>({number:i.number})), phase, type, scope, status });
    }
  }
  for(const slug of bySlug.keys()) if(!yamlSlugs.has(slug)) orphan.push(slug);
  return { rows, duplicates, missing, orphan };
}

function main(){
  const yaml = loadYaml();
  const issues = getIssues().filter(i=> i.labels.some(l=> l.name==='roadmap' || l.name.startsWith('roadmap:')));
  const { rows, duplicates, missing, orphan } = aggregate(issues, yaml);
  const table = buildTable(rows);
  const roadmapPath = path.join(__dirname,'..','docs','roadmap.md');
  const md = fs.readFileSync(roadmapPath,'utf8');
  const updated = insert(md,table);
  fs.writeFileSync(roadmapPath,updated);
  console.log('Updated roadmap with', rows.length, 'defined items.');
  if(duplicates.length) console.log('DUPLICATE slugs:', duplicates.join(','));
  if(missing.length) console.log('MISSING issues for slugs:', missing.join(','));
  if(orphan.length) console.log('ORPHAN labels not in yaml:', orphan.join(','));
}

main();
