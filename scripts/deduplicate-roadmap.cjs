#!/usr/bin/env node
/**
 * deduplicate-roadmap.cjs
 * Merge & close duplicate canonical slugs.
 * Policy:
 *  - For each slug with >1 issue: choose canonical = lowest issue number (oldest)
 *  - Append a consolidation section to canonical issue body referencing closed issues
 *  - Close other issues with comment referencing canonical
 *  - Remove [slug] prefix from duplicate titles (so validation will not see them)
 *  - Dry run by default; use --apply to execute
 */
const { execSync } = require('child_process');
function sh(cmd){ return execSync(cmd,{stdio:['ignore','pipe','pipe']}).toString(); }
function safe(str){ return JSON.stringify(str); }
const apply = process.argv.includes('--apply');
const issues = JSON.parse(sh("gh issue list --label roadmap --limit 500 --json number,title,body,state,author"));
const slugRe = /^\[(.+?)\]/;
const groups = new Map();
for(const issue of issues){
  const m = issue.title.match(slugRe); if(!m) continue; const slug=m[1];
  if(!groups.has(slug)) groups.set(slug, []); groups.get(slug).push(issue);
}
let actions=0;
for(const [slug, list] of groups){
  if(list.length < 2) continue;
  list.sort((a,b)=> a.number - b.number); // oldest first
  const canonical = list[0];
  const dups = list.slice(1);
  console.log(`Slug '${slug}' duplicates -> canonical #${canonical.number}; closing: ${dups.map(d=> '#' + d.number).join(', ')}`);
  actions++;
  if(!apply) continue;
  // Build consolidation note
  let note = `\n\n---\n**Consolidation:** Closed duplicate issues: ${dups.map(d=>'#'+d.number).join(', ')}.`;
  try {
    const newBody = (canonical.body || '') + note;
    sh(`gh issue edit ${canonical.number} --body ${safe(newBody)}`);
  } catch(e){ console.error('Failed updating canonical body', canonical.number, e.message); }
  for(const dup of dups){
    const strippedTitle = dup.title.replace(slugRe,'').trim() || dup.title;
    try { sh(`gh issue comment ${dup.number} --body ${safe(`Consolidated into #${canonical.number}`)}`); } catch(e){ console.error('Comment fail', dup.number, e.message); }
    try { sh(`gh issue edit ${dup.number} --title ${safe(strippedTitle)}`); } catch(e){ console.error('Title edit fail', dup.number, e.message); }
    try { sh(`gh issue close ${dup.number}`); } catch(e){ console.error('Close fail', dup.number, e.message); }
  }
}
if(!actions) console.log('No duplicates found.');
else if(!apply) console.log(`Planned duplicate groups: ${actions} (rerun with --apply to merge & close)`);
