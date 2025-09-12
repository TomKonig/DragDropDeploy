#!/usr/bin/env node
/**
 * migrate-tasklist-to-issues.cjs
 *
 * Reads the deprecated tasklist.md and outputs `gh issue create` commands for unchecked items.
 * It attempts to infer labels from phase headings and task keywords.
 *
 * Usage:
 *   node scripts/migrate-tasklist-to-issues.cjs [--dry]
 * Pipe to a shell or review manually. Does not execute commands automatically.
 */

const fs = require('fs');
const path = require('path');

const TASKLIST_PATH = path.join(__dirname, '..', 'tasklist.md');
const dryRun = process.argv.includes('--dry');

if (!fs.existsSync(TASKLIST_PATH)) {
  console.error('tasklist.md not found at expected path:', TASKLIST_PATH);
  process.exit(1);
}

const md = fs.readFileSync(TASKLIST_PATH, 'utf8');
const lines = md.split(/\r?\n/);

let currentPhase = null;
const phaseRe = /^##\s+Phase\s+(\d+):/i;
const uncheckedTaskRe = /^- \[ \] (.+)/; // unchecked only
const POST_MVP_REGEX = /post-mvp/i; // marker to exclude

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/`[^`]+`/g, '') // remove inline code backtick segments
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

function inferArea(title) {
  const map = [
    [/auth|jwt|login|register|role|rbac/i, 'scope:backend'],
    [/build|deploy|upload|artifact|minify|pipeline/i, 'scope:backend'],
    [/frontend|react|vite|ui|component/i, 'scope:frontend'],
    [/doc|readme|guide|changelog|roadmap/i, 'scope:docs'],
    [/docker|compose|traefik|infra|network|redis|postgres|container/i, 'scope:infra'],
  ];
  for (const [re, label] of map) if (re.test(title)) return label;
  return 'scope:backend';
}

function inferType(title) {
  if (/security|harden|encrypt|rls|secret/i.test(title)) return 'type:security';
  if (/doc|guide|readme|changelog|roadmap/i.test(title)) return 'type:docs';
  if (/fix|bug|correct|error|issue/i.test(title)) return 'type:bug';
  if (/refactor|cleanup|restructure/i.test(title)) return 'type:refactor';
  if (/test|coverage/i.test(title)) return 'type:chore';
  return 'type:feature';
}

const commands = [];

for (const line of lines) {
  const phaseMatch = phaseRe.exec(line);
  if (phaseMatch) {
    currentPhase = phaseMatch[1];
    continue;
  }
  const taskMatch = uncheckedTaskRe.exec(line);
  if (taskMatch && currentPhase) {
    const title = taskMatch[1].trim();
    // Skip explicitly tagged post-MVP tasks
    if (POST_MVP_REGEX.test(title)) {
      continue;
    }
    // Skip already checked tasks (pattern ensures unchecked only)
    const slug = slugify(title);
    const labels = [
      `phase:${currentPhase}`,
      inferArea(title),
      inferType(title),
      `roadmap:${slug}`
    ];
    const escapedTitle = title.replace(/"/g, '\\"');
    const bodyLines = [
      `Imported from deprecated tasklist (Phase ${currentPhase}).`,
      'Acceptance Criteria:',
      '- [ ] Define measurable outcome',
      '- [ ] Add tests / docs / changelog entry',
      'Migration Note: Replace roadmap status manually if this closes the item.'
    ];
    const body = bodyLines.join('\\n').replace(/"/g, '\\"');
    const cmd = `gh issue create --title "${escapedTitle}" --body "${body}" --label "${labels.join(',')}"`;
    commands.push(cmd);
  }
}

if (!commands.length) {
  console.log('# No unchecked tasks found to migrate.');
  process.exit(0);
}

console.log('# Review and execute (remove --dry to run individually if you adapt).');
for (const c of commands) {
  console.log(c);
}

if (!dryRun) {
  console.log('\n# NOTE: This script only prints commands. Execute them manually to create issues.');
}
