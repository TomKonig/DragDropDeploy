#!/usr/bin/env node
/**
 * Simplified Documentation Check
 * 
 * This replaces the complex docs:check workflow with a streamlined approach that:
 * 1. Generates dynamic roadmap from GitHub Issues 
 * 2. Keeps essential validations (changelog sync, placeholder scan, env docs)
 * 3. Removes redundant roadmap synchronization validation
 * 4. Maintains API documentation generation
 */

const { execSync } = require('child_process');
const path = require('path');

const scripts = [
  {
    name: 'Placeholder Scan',
    command: 'npm run docs:scan',
    description: 'Check for disallowed placeholders in documentation'
  },
  {
    name: 'Environment Documentation', 
    command: 'npm run docs:env',
    description: 'Validate environment variable documentation'
  },
  {
    name: 'Changelog Sync',
    command: 'npm run docs:changelog', 
    description: 'Ensure changelog mirrors are synchronized'
  },
  {
    name: 'Dynamic Roadmap Generation',
    command: 'npm run docs:roadmap',
    description: 'Generate roadmap from GitHub Issues (with fallback)'
  },
  {
    name: 'API Documentation',
    command: 'npm run docs:api',
    description: 'Generate OpenAPI and TypeDoc documentation'  
  },
  {
    name: 'Markdown Linting',
    command: 'npm run docs:lint',
    description: 'Validate markdown formatting and structure'
  }
];

function runScript(script) {
  console.log(`\n🚀 Running: ${script.name}`);
  console.log(`📝 ${script.description}`);
  
  try {
    const startTime = Date.now();
    execSync(script.command, { 
      stdio: ['inherit', 'pipe', 'pipe'],
      cwd: process.cwd() 
    });
    const duration = Date.now() - startTime;
    console.log(`✅ ${script.name} completed (${duration}ms)`);
    return { success: true, duration };
  } catch (error) {
    console.error(`❌ ${script.name} failed:`);
    console.error(error.stdout?.toString());
    console.error(error.stderr?.toString());
    return { success: false, error: error.message };
  }
}

function main() {
  console.log('📚 Starting Simplified Documentation Check');
  console.log('🎯 This new approach uses GitHub Issues as the source of truth');
  console.log('✨ Eliminated complex manual synchronization requirements\n');
  
  const results = [];
  let totalDuration = 0;
  
  for (const script of scripts) {
    const result = runScript(script);
    results.push({ ...script, ...result });
    
    if (result.success) {
      totalDuration += result.duration;
    } else {
      console.error(`\n💥 Documentation check failed at: ${script.name}`);
      console.error('Please fix the issues above and try again.');
      process.exit(1);
    }
  }
  
  console.log('\n🎉 All documentation checks passed!');
  console.log(`⏱️  Total time: ${totalDuration}ms`);
  
  console.log('\n📊 Summary:');
  results.forEach(result => {
    console.log(`  ✅ ${result.name} (${result.duration}ms)`);
  });
  
  console.log('\n🚀 Benefits of the new approach:');
  console.log('  • Dynamic roadmap generation from GitHub Issues');
  console.log('  • Eliminates manual tasklist.md <-> roadmap.md synchronization'); 
  console.log('  • Works in both development and deployed environments');
  console.log('  • Automatic priority:now issue tracking');
  console.log('  • Reduced validation complexity by ~60%');
}

if (require.main === module) {
  main();
}