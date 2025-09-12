#!/usr/bin/env node
/**
 * Run typedoc for shared + backend and enforce zero internal warnings.
 * We classify a warning line as internal if it references a path under packages
 * (e.g., /backend/src or /shared/src). Dependency type omissions are ignored.
 */
const { spawnSync } = require('child_process');
const path = require('path');

const projects = [
  { name: '@dragdropdeploy/shared', script: ['npm','run','typedoc','-w','@dragdropdeploy/shared'] },
  { name: '@dragdropdeploy/backend', script: ['npm','run','typedoc','-w','@dragdropdeploy/backend'] }
];

let internalWarnings = [];
for (const p of projects) {
  const res = spawnSync(p.script[0], p.script.slice(1), { encoding: 'utf8' });
  process.stdout.write(res.stdout);
  process.stderr.write(res.stderr);
  if (res.status !== 0) {
    console.error('typedoc-strict: underlying typedoc failed for', p.name);
    process.exit(res.status);
  }
  const lines = (res.stderr + res.stdout).split(/\r?\n/);
  for (const line of lines) {
    if (!/\[warning\]/i.test(line)) continue;
    // Ignore warnings about symbols not included that originate from node_modules
    if (/node_modules/.test(line)) continue;
    // Consider it internal if it references backend/src or shared/src
    if (/(backend|shared)\/src\//.test(line)) {
      internalWarnings.push(line.trim());
    }
  }
}

if (internalWarnings.length) {
  console.error('typedoc-strict: Internal documentation warnings detected (fail):');
  for (const w of internalWarnings) console.error('  ' + w);
  process.exit(1);
}
console.log('typedoc-strict: No internal documentation warnings.');
