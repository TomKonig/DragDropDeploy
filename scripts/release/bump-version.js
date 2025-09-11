#!/usr/bin/env node
/*
 Simple monorepo version bump script.
 - Bumps root version (semver) based on arg patch|minor|major.
 - Propagates same version to workspace packages maintaining alignment.
 - Updates CHANGELOG.md by inserting heading if missing for version under Unreleased.
 - Writes docs/reference/changelog.md mirror (re-using existing sync script expectations).
 - Does NOT commit or tag (user runs git commit & git tag manually or add future automation).
 Usage: node scripts/release/bump-version.js patch
*/
const fs = require('fs');
const path = require('path');
const TYPES = ['patch','minor','major'];
const args = process.argv.slice(2);
const type = args[0];
const flags = new Set(args.slice(1));
if(!TYPES.includes(type)){
  console.error('Specify bump type: patch|minor|major [--tag] [--push]');
  process.exit(1);
}
const ROOT = path.join(__dirname, '..', '..');
const rootPkgPath = path.join(ROOT,'package.json');
const pkgs = [rootPkgPath,
  path.join(ROOT,'backend','package.json'),
  path.join(ROOT,'frontend','package.json'),
  path.join(ROOT,'shared','package.json')
];
function readJSON(p){return JSON.parse(fs.readFileSync(p,'utf8'));}
function writeJSON(p,obj){fs.writeFileSync(p, JSON.stringify(obj,null,2)+"\n");}
function bump(v){
  const [maj,min,pat] = v.split('.').map(Number);
  if(type==='patch') return `${maj}.${min}.${pat+1}`;
  if(type==='minor') return `${maj}.${min+1}.0`;
  if(type==='major') return `${maj+1}.0.0`;
}
// Ensure clean working tree unless --allow-dirty flag provided
function isDirty(){
  try { const { execSync } = require('child_process');
    const out = execSync('git status --porcelain', { encoding: 'utf8' });
    return out.trim().length > 0;
  } catch { return false; }
}
if(isDirty() && !flags.has('--allow-dirty')){
  console.error('Working tree not clean. Commit or stash changes, or pass --allow-dirty.');
  process.exit(1);
}

const rootPkg = readJSON(rootPkgPath);
const newVersion = bump(rootPkg.version);
// Update all package versions (keep same for simplicity now)
for(const p of pkgs){
  const data = readJSON(p);
  data.version = newVersion;
  // Update internal dependency references if needed
  for(const depField of ['dependencies','devDependencies']){
    if(data[depField]){
      for(const name of Object.keys(data[depField])){
        if(name.startsWith('@dragdropdeploy/')){
          data[depField][name] = newVersion;
        }
      }
    }
  }
  writeJSON(p,data);
}
// Update CHANGELOG
const changelogPath = path.join(ROOT,'CHANGELOG.md');
let changelog = fs.readFileSync(changelogPath,'utf8');
const unreleasedMarker = '## Unreleased';
if(!changelog.includes(unreleasedMarker)){
  console.error('CHANGELOG missing Unreleased section');
  process.exit(1);
}
const versionHeading = `## ${newVersion}`;
if(changelog.includes(versionHeading)){
  console.log('Version heading already present in CHANGELOG');
} else {
  const dateStr = (flags.has('--tag') || flags.has('--push')) ? new Date().toISOString().slice(0,10) : 'TBD';
  changelog = changelog.replace(unreleasedMarker, `${unreleasedMarker}\n\n${versionHeading} - ${dateStr}`);
  fs.writeFileSync(changelogPath, changelog);
}
console.log(`Bumped version to ${newVersion}`);
const commitMsg = `chore(release): v${newVersion}`;
if(flags.has('--tag') || flags.has('--push')){
  try {
    const { execSync } = require('child_process');
  execSync('git add .', { stdio: 'inherit' });
  // If changelog previously had TBD we may want to ensure date is updated again (already handled above)
  execSync(`git commit -m "${commitMsg}"`, { stdio: 'inherit' });
    execSync(`git tag v${newVersion}`, { stdio: 'inherit' });
    console.log('Created commit and tag v'+newVersion);
    if(flags.has('--push')){
      execSync('git push origin HEAD', { stdio: 'inherit' });
      execSync('git push origin --tags', { stdio: 'inherit' });
      console.log('Pushed commit and tags.');
    } else {
      console.log('Run: git push origin HEAD && git push origin --tags');
    }
  } catch (e) {
    console.error('Auto tagging failed:', e.message);
    process.exit(1);
  }
} else {
  console.log('Next steps: git add . && git commit -m "'+commitMsg+'" && git tag v'+newVersion);
}
