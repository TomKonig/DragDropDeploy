#!/usr/bin/env node
/**
 * Issue Cleanup Execution Script
 * 
 * This script provides the exact GitHub CLI commands needed to clean up
 * the identified duplicate and resolved issues.
 * 
 * Usage: node scripts/maintenance/cleanup-resolved-issues.js [--dry-run]
 */

const REPO = 'TomKonig/DragDropDeploy';

const cleanupActions = {
  exactDuplicates: [
    { close: 23, reason: 'Duplicate of #33 - identical repository clone implementation' },
    { close: 22, reason: 'Duplicate of #32 - identical upload security requirements' }
  ],
  
  implementedFeatures: [
    { close: 12, reason: 'IMPLEMENTED: Multipart upload endpoint exists with full test coverage' },
    { close: 21, reason: 'IMPLEMENTED: Upload test factory helpers completed with E2E tests' },
    { close: 44, reason: 'IMPLEMENTED: Rollback functionality exists in DeploymentsService' },
    { close: 67, reason: 'IMPLEMENTED: Auth pages integrated with JWT system' },
    { close: 64, reason: 'IMPLEMENTED: Secure JWT authentication with proper guards' },
    { close: 54, reason: 'IMPLEMENTED: Security hardening (Helmet, CORS, parameterized queries)' },
    { close: 55, reason: 'IMPLEMENTED: Project build flags via settings system' },
    { close: 58, reason: 'IMPLEMENTED: Prisma migration workflow with documentation' }
  ]
};

function generateCommands(dryRun = false) {
  console.log('=== GITHUB CLI COMMANDS FOR ISSUE CLEANUP ===\n');
  
  if (dryRun) {
    console.log('🔍 DRY RUN MODE - Commands will be displayed but not executed\n');
  }
  
  console.log('# 1. Close Exact Duplicates');
  cleanupActions.exactDuplicates.forEach(item => {
    const cmd = `gh issue close ${item.close} --repo ${REPO} --comment "${item.reason}"`;
    console.log(cmd);
  });
  console.log();
  
  console.log('# 2. Close Implemented Features');
  cleanupActions.implementedFeatures.forEach(item => {
    const cmd = `gh issue close ${item.close} --repo ${REPO} --comment "${item.reason}"`;
    console.log(cmd);
  });
  console.log();
  
  console.log('# 3. Manual Review Required');
  console.log('# Check if consolidated issues are actually closed:');
  const consolidationChecks = [
    'gh issue list --repo ' + REPO + ' --search "13 OR 14 OR 15 OR 24 OR 25 OR 34" # Should be closed per #12',
    'gh issue list --repo ' + REPO + ' --search "17 OR 18 OR 26 OR 27 OR 28 OR 35 OR 36 OR 37 OR 39 OR 40 OR 42 OR 70" # Should be closed per #16'
  ];
  consolidationChecks.forEach(cmd => console.log(cmd));
  console.log();
  
  console.log('# 4. Batch close consolidated issues (run after verification):');
  console.log('# gh issue close 13 14 15 24 25 34 --repo ' + REPO + ' --comment "Consolidated into #12 (multipart-upload-endpoint)"');
  console.log();
  
  const totalClosures = cleanupActions.exactDuplicates.length + cleanupActions.implementedFeatures.length;
  console.log(`📊 SUMMARY: ${totalClosures} issues ready for immediate closure`);
  console.log('📋 Additional manual review: ~25 Phase 6 checklist items + consolidation verification');
  
  return totalClosures;
}

if (require.main === module) {
  const isDryRun = process.argv.includes('--dry-run');
  generateCommands(isDryRun);
}

module.exports = { generateCommands, cleanupActions };