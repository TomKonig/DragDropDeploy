#!/usr/bin/env node
/**
 * verify-clean-tree.cjs
 * Ensures that running generation + build steps did not leave uncommitted changes.
 * This is critical for parity between local pre-push and GitHub CI.
 */
const { execSync } = require('child_process');

function git(cmd) {
  return execSync(cmd, { encoding: 'utf8' }).trim();
}

try {
  // Refresh index
  execSync('git update-index -q --refresh');
  const status = git('git status --porcelain');
  if (status) {
    console.error('[ci:verify] Working tree dirty after ci:full run. The following files differ:\n' + status);
    console.error('[ci:verify] Please commit generated changes or add them to generation scripts.');
    process.exit(1);
  } else {
    console.log('[ci:verify] Working tree clean.');
  }
} catch (e) {
  console.error('[ci:verify] Error verifying clean tree:', e.message);
  process.exit(1);
}
