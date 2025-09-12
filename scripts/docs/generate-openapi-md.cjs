#!/usr/bin/env node
/*
 * Generate markdown API reference from backend openapi.json
 */
const fs = require('fs');
const path = require('path');

const projectRoot = process.cwd();
const specPath = path.join(projectRoot, 'backend', 'openapi', 'openapi.json');
const targetPath = path.join(projectRoot, 'docs', 'reference', 'api.md');

if (!fs.existsSync(specPath)) {
  console.error('OpenAPI spec not found at', specPath, '\nRun: npm run openapi:gen -w backend');
  process.exit(1);
}

const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));

function render() {
  const sections = [];
  const paths = spec.paths || {};
  // Group by tag (fallback to 'default')
  const byTag = {};
  for (const [p, methods] of Object.entries(paths)) {
    for (const [method, op] of Object.entries(methods)) {
      if (!op || typeof op !== 'object') continue;
      const tags = op.tags && op.tags.length ? op.tags : ['default'];
      for (const tag of tags) {
        byTag[tag] = byTag[tag] || [];
        byTag[tag].push({ path: p, method: method.toUpperCase(), op });
      }
    }
  }
  const sortedTags = Object.keys(byTag).sort();
  for (const tag of sortedTags) {
    sections.push(`### ${tag}`);
    sections.push('');
    for (const entry of byTag[tag]) {
      const { path: p, method, op } = entry;
      const summary = op.summary || '';
      const desc = (op.description || '').replace(/\r\n/g, '\n');
      sections.push(`#### ${method} ${p}`);
      if (summary) sections.push(`*${summary}*`);
      if (desc) sections.push(`\n${desc}`);
      // Parameters
      if (op.parameters && op.parameters.length) {
        sections.push('\nParameters:');
        for (const param of op.parameters) {
          const requiredFlag = param.required ? '**required** ' : '';
            // Using backticks in output directly (no escaping inside template literal)
          sections.push(`- \`${param.name}\` (${param.in}) ${requiredFlag}- ${param.description || ''}`.trim());
        }
      }
      // Request body (summary only)
      if (op.requestBody) {
        sections.push('\nRequest Body:');
        const rb = op.requestBody;
        const reqDesc = rb.description ? rb.description + '\n' : '';
        sections.push(reqDesc + 'Content types: ' + Object.keys((rb.content)||{}).join(', '));
      }
      // Responses
      if (op.responses) {
        sections.push('\nResponses:');
        for (const [code, resp] of Object.entries(op.responses)) {
          const rDesc = resp.description || '';
          sections.push(`- ${code}: ${rDesc.split('\n')[0]}`);
        }
      }
      sections.push('');
    }
  }
  return sections.join('\n');
}

const markerStart = '<!-- AUTO-API:START -->';
const markerEnd = '<!-- AUTO-API:END -->';
let current = fs.readFileSync(targetPath, 'utf8');
const rendered = render();
if (!current.includes(markerStart) || !current.includes(markerEnd)) {
  console.error('Markers not found in api.md');
  process.exit(1);
}
current = current.replace(new RegExp(`${markerStart}[\s\S]*?${markerEnd}`), `${markerStart}\n\n${rendered}\n\n${markerEnd}`);
fs.writeFileSync(targetPath, current);
console.log('API markdown updated');
