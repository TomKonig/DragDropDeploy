#!/usr/bin/env node
/**
 * Test the dynamic roadmap generator with mock data
 */

const { generateRoadmapMarkdown } = require('./generate-roadmap.js');
const fs = require('fs');
const path = require('path');

// Mock data that simulates what we'd get from the GitHub API
const mockData = {
  lastUpdated: new Date().toISOString(),
  roadmapItems: [
    {
      title: 'I18n baseline', 
      status: '🟡',
      description: 'Parent feature issue for i18n-baseline. Sub-issues: #80 Localization placeholder...',
      category: 'User Experience',
      number: 130,
      url: 'https://github.com/TomKonig/DragDropDeploy/issues/130',
      slug: 'i18n-baseline'
    },
    {
      title: 'General security hardening',
      status: '🔒', 
      description: 'Parent feature issue for security-hardening. Sub-issues: #54 Security hardening headers...',
      category: 'Security & Reliability',
      number: 129,
      url: 'https://github.com/TomKonig/DragDropDeploy/issues/129',
      slug: 'security-hardening'
    },
    {
      title: 'Auth session hardening',
      status: '🔒',
      description: 'Parent feature issue for auth-session-hardening. Sub-issues: #64 Secure session cookies...',
      category: 'Security & Reliability', 
      number: 128,
      url: 'https://github.com/TomKonig/DragDropDeploy/issues/128',
      slug: 'auth-session-hardening'
    },
    {
      title: 'Authentication UI',
      status: '🟡',
      description: 'Parent feature issue for auth-ui. Sub-issues: #67 Auth pages (login/register)',
      category: 'User Experience',
      number: 127,
      url: 'https://github.com/TomKonig/DragDropDeploy/issues/127',
      slug: 'auth-ui'
    },
    {
      title: 'Themes & plugins framework',
      status: '🚀',
      description: 'Parent feature issue for themes-and-plugins. Sub-issues: #78 Theming-ready CSS architecture...',
      category: 'Features',
      number: 126,
      url: 'https://github.com/TomKonig/DragDropDeploy/issues/126',
      slug: 'themes-and-plugins'
    },
    {
      title: 'Introduce enforceable ESLint baseline',
      status: '🚀',
      description: 'Adopt a unified, enforceable ESLint configuration across backend, frontend, shared packages.',
      category: 'Developer Experience',
      number: 114,
      url: 'https://github.com/TomKonig/DragDropDeploy/issues/114', 
      slug: 'dev-tooling'
    }
  ],
  priorityNowItems: [
    {
      number: 133,
      title: 'Implement headless mode via env_var',
      html_url: 'https://github.com/TomKonig/DragDropDeploy/issues/133'
    },
    {
      number: 132, 
      title: 'Add two first out-of-the-box plugins to support Hugo & Jekyll',
      html_url: 'https://github.com/TomKonig/DragDropDeploy/issues/132'
    },
    {
      number: 131,
      title: 'Create default theme to use for marketing site for software itself.',
      html_url: 'https://github.com/TomKonig/DragDropDeploy/issues/131'
    }
  ],
  note: 'This is a test generation showing how the roadmap would look with real GitHub Issues data.'
};

console.log('🧪 Testing roadmap generation with mock data...');

const markdownContent = generateRoadmapMarkdown(mockData);
const testFile = path.join(__dirname, '..', '..', 'docs', 'roadmap-test.md');

fs.writeFileSync(testFile, markdownContent, 'utf8');

console.log(`✅ Test roadmap generated: ${testFile}`);
console.log(`📊 Generated ${mockData.roadmapItems.length} roadmap items across ${Object.keys(mockData.roadmapItems.reduce((acc, item) => {
  acc[item.category] = true;
  return acc;
}, {})).length} categories`);
console.log(`⚡ Found ${mockData.priorityNowItems.length} unassigned priority:now items`);