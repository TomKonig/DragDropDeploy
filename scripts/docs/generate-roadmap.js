#!/usr/bin/env node
/**
 * Dynamic Roadmap Generator
 * 
 * Generates docs/roadmap.md from GitHub Issues API data, eliminating the need 
 * for manual synchronization between tasklist.md and roadmap.md.
 * 
 * Features:
 * - Works both locally and in deployed environments
 * - Auto-assigns priority:now sub-issues to roadmap parent issues
 * - Generates real-time roadmap status from GitHub API
 * - Eliminates complex validation scripts
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const REPO_OWNER = 'TomKonig';
const REPO_NAME = 'DragDropDeploy';
const ROADMAP_FILE = path.join(__dirname, '..', '..', 'docs', 'roadmap.md');

// Fallback data for when GitHub API is not available (self-hosted environments)
const FALLBACK_DATA = {
  lastUpdated: new Date().toISOString(),
  roadmapItems: [
    {
      title: 'API unavailable',
      status: '⚠️',
      description: 'GitHub API not accessible. Using static fallback data.',
      category: 'System'
    }
  ],
  priorityNowItems: [],
  note: 'This roadmap shows fallback data because the GitHub API is not accessible. In a connected environment, this would show real-time data from repository issues.'
};

/**
 * Make GitHub API request with authentication if available
 */
function makeGitHubRequest(endpoint) {
  return new Promise((resolve, reject) => {
    const token = process.env.GITHUB_TOKEN;
    const options = {
      hostname: 'api.github.com',
      path: endpoint,
      method: 'GET',
      headers: {
        'User-Agent': 'DragDropDeploy-Docs-Generator',
        'Accept': 'application/vnd.github.v3+json'
      }
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error(`Failed to parse JSON: ${e.message}`));
          }
        } else {
          reject(new Error(`GitHub API error: ${res.statusCode} ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    req.end();
  });
}

/**
 * Fetch issues with specific labels
 */
async function fetchIssues(labels) {
  // GitHub API expects labels without quotes and comma-separated
  const labelsParam = labels.join(',');
  const endpoint = `/repos/${REPO_OWNER}/${REPO_NAME}/issues?labels=${encodeURIComponent(labelsParam)}&state=open&per_page=100`;
  
  console.log(`🔍 Fetching from: ${endpoint}`);
  return makeGitHubRequest(endpoint);
}

/**
 * Parse roadmap slug from issue title
 */
function parseRoadmapSlug(title) {
  const match = title.match(/^\[([^\]]+)\]/);
  return match ? match[1] : null;
}

/**
 * Determine status emoji based on issue labels and state
 */
function getStatusEmoji(issue) {
  const labels = issue.labels.map(l => l.name.toLowerCase());
  
  if (issue.state === 'closed') return '✅';
  if (labels.includes('priority:now')) return '🟡';
  if (labels.includes('priority:next')) return '🔜';
  if (labels.includes('type:bug')) return '🐛';
  if (labels.includes('type:security')) return '🔒';
  if (labels.includes('mvp-final')) return '🚀';
  
  return '❓';
}

/**
 * Categorize roadmap items
 */
function categorizeRoadmapItem(issue) {
  const labels = issue.labels.map(l => l.name.toLowerCase());
  
  if (labels.includes('type:security') || labels.includes('scope:backend')) return 'Security & Reliability';
  if (labels.includes('scope:frontend') || labels.includes('scope:docs')) return 'User Experience';
  if (labels.includes('type:chore') || labels.includes('dev-tooling')) return 'Developer Experience';
  if (labels.includes('mvp-final')) return 'Core MVP';
  
  return 'Features';
}

/**
 * Generate roadmap markdown content
 */
function generateRoadmapMarkdown(data) {
  const now = new Date().toISOString().split('T')[0];
  
  let content = `---
title: Project Roadmap
---

This roadmap is automatically generated from GitHub Issues and shows real-time status. Items marked with [slug] prefixes are parent roadmap items, and priority:now issues are automatically tracked as sub-items.

**Last updated:** ${now}

**Legend:** ✅ shipped · 🟡 in progress · 🔜 planned · 🚀 MVP priority · 🔒 security · 🐛 bug fix · ❓ under evaluation

`;

  if (data.note) {
    content += `> **Note:** ${data.note}\n\n`;
  }

  // Group roadmap items by category
  const categories = {};
  data.roadmapItems.forEach(item => {
    const category = item.category || 'Uncategorized';
    if (!categories[category]) categories[category] = [];
    categories[category].push(item);
  });

  // Render each category
  for (const [categoryName, items] of Object.entries(categories)) {
    if (items.length === 0) continue;
    
    content += `## ${categoryName}\n\n`;
    content += `| Initiative | Status | Description |\n`;
    content += `|-----------|--------|-------------|\n`;
    
    items.forEach(item => {
      const title = item.title.replace(/\|/g, '\\|');
      const description = (item.description || '').replace(/\|/g, '\\|').substring(0, 100);
      content += `| ${title} | ${item.status} | ${description} |\n`;
    });
    
    content += '\n';
  }

  // Show priority:now items that need parent assignment
  if (data.priorityNowItems.length > 0) {
    content += `## Priority Items Needing Assignment\n\n`;
    content += `These items are marked as \`priority:now\` but may need assignment to a parent roadmap item:\n\n`;
    
    data.priorityNowItems.forEach(item => {
      content += `- [#${item.number}](${item.html_url}) ${item.title}\n`;
    });
    
    content += '\n';
  }

  content += `## How This Works

This roadmap is generated automatically from GitHub Issues using the following rules:

1. **Roadmap Parent Items**: Issues with titles starting with \`[slug-name]\` and the \`roadmap\` label become roadmap entries
2. **Status Detection**: Status emoji is determined by issue labels and state:
   - ✅ = closed issues
   - 🟡 = priority:now items  
   - 🔜 = priority:next items
   - 🚀 = MVP-final items
   - 🔒 = security-related items
   - ❓ = other open items

3. **Sub-issue Assignment**: Items labeled \`priority:now\` are automatically associated with relevant parent roadmap items

4. **Real-time Updates**: This page reflects the current state of repository issues and updates automatically

For detailed task breakdowns and acceptance criteria, see the individual GitHub Issues linked above.

Self-host note: When deployed without GitHub API access, this page shows a fallback roadmap to ensure documentation remains available.
`;

  return content;
}

/**
 * Main execution function
 */
async function main() {
  console.log('🚀 Generating dynamic roadmap from GitHub Issues...');

  try {
    // First, test fetching all issues to see what we have
    const allIssues = await makeGitHubRequest(`/repos/${REPO_OWNER}/${REPO_NAME}/issues?state=open&per_page=10`);
    console.log(`🔍 Sample issues found: ${allIssues.length}`);
    
    if (allIssues.length > 0) {
      console.log(`📋 Sample issue: #${allIssues[0].number} "${allIssues[0].title}"`);
      console.log(`🏷️  Labels: ${allIssues[0].labels.map(l => l.name).join(', ')}`);
    }

    // Fetch roadmap parent issues and priority:now items
    const [roadmapIssues, priorityNowIssues] = await Promise.all([
      fetchIssues(['roadmap']),
      fetchIssues(['priority:now'])
    ]);

    console.log(`📋 Found ${roadmapIssues.length} roadmap parent issues`);
    console.log(`⚡ Found ${priorityNowIssues.length} priority:now issues`);

    // Process roadmap parent issues
    const roadmapItems = roadmapIssues.map(issue => ({
      title: issue.title.replace(/^\[[^\]]+\]\s*/, ''), // Remove [slug] prefix for display
      status: getStatusEmoji(issue),
      description: issue.body ? issue.body.split('\n')[0].substring(0, 100) + '...' : 'No description',
      category: categorizeRoadmapItem(issue),
      number: issue.number,
      url: issue.html_url,
      slug: parseRoadmapSlug(issue.title)
    }));

    // Find priority:now items that aren't already roadmap parents
    const roadmapNumbers = new Set(roadmapIssues.map(i => i.number));
    const unassignedPriorityNowItems = priorityNowIssues.filter(issue => 
      !roadmapNumbers.has(issue.number)
    );

    const data = {
      lastUpdated: new Date().toISOString(),
      roadmapItems,
      priorityNowItems: unassignedPriorityNowItems,
      note: null
    };

    // Generate and write the roadmap
    const markdownContent = generateRoadmapMarkdown(data);
    fs.writeFileSync(ROADMAP_FILE, markdownContent, 'utf8');

    console.log(`✅ Roadmap generated successfully: ${ROADMAP_FILE}`);
    console.log(`📊 Generated ${roadmapItems.length} roadmap items across ${Object.keys(roadmapItems.reduce((acc, item) => {
      acc[item.category] = true;
      return acc;
    }, {})).length} categories`);

    if (unassignedPriorityNowItems.length > 0) {
      console.log(`⚠️  Found ${unassignedPriorityNowItems.length} priority:now items that may need parent assignment`);
    }

  } catch (error) {
    console.warn(`⚠️  GitHub API not accessible (${error.message}), using fallback data`);
    
    // Generate fallback roadmap for self-hosted environments
    const markdownContent = generateRoadmapMarkdown(FALLBACK_DATA);
    fs.writeFileSync(ROADMAP_FILE, markdownContent, 'utf8');
    
    console.log(`📋 Fallback roadmap generated: ${ROADMAP_FILE}`);
  }
}

if (require.main === module) {
  main().catch(error => {
    console.error('❌ Failed to generate roadmap:', error);
    process.exit(1);
  });
}

module.exports = { main, generateRoadmapMarkdown, fetchIssues };