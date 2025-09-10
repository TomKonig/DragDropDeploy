#!/usr/bin/env node
/*
 Simple multi-package outdated reporter.
 Scans root, backend, frontend for outdated npm deps.
 Exits with code 0 always; prints JSON & human table.
*/
const { execSync } = require('child_process');
const fs = require('fs');

const targets = [
  { name: 'root', path: '.' },
  { name: 'backend', path: 'backend' },
  { name: 'frontend', path: 'frontend' }
];

function run(cmd, cwd) {
  try {
    return execSync(cmd, { cwd, stdio: 'pipe', encoding: 'utf8' });
  } catch (e) {
    return e.stdout || '';
  }
}

const report = [];
for (const t of targets) {
  if (!fs.existsSync(`${t.path}/package.json`)) continue;
  const json = run('npm outdated --json || true', t.path).trim();
  let parsed = {};
  if (json) {
    try { parsed = JSON.parse(json); } catch { parsed = {}; }
  }
  const entries = Object.entries(parsed).map(([pkg, info]) => ({
    package: pkg,
    current: info.current,
    wanted: info.wanted,
    latest: info.latest,
    location: t.name,
    type: info.type || 'prod'
  }));
  report.push(...entries);
}

if (report.length === 0) {
  console.log('All dependencies up to date.');
  process.exit(0);
}

// Human table
console.log('\nOutdated dependencies:');
console.log('pkg\tlocation\ttype\tcurrent\twanted\tlatest');
for (const r of report) {
  console.log(`${r.package}\t${r.location}\t${r.type}\t${r.current}\t${r.wanted}\t${r.latest}`);
}

// JSON artifact for CI
fs.writeFileSync('outdated-deps.json', JSON.stringify(report, null, 2));
console.log('\nJSON written to outdated-deps.json');
