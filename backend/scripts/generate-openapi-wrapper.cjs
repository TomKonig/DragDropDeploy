#!/usr/bin/env node
// Wrapper to attempt OpenAPI generation; on failure, emit stub spec
const { spawnSync } = require('node:child_process');
const { writeFileSync, mkdirSync } = require('node:fs');
const { join } = require('node:path');

function writeStub() {
  const outDir = join(process.cwd(), 'openapi');
  mkdirSync(outDir, { recursive: true });
  const jsonPath = join(outDir, 'openapi.json');
  const stub = { openapi: '3.0.0', info: { title: 'DragDropDeploy API (stub)', version: process.env.npm_package_version || '0.0.0' }, paths: {}, components: {} };
  writeFileSync(jsonPath, JSON.stringify(stub, null, 2));
  console.warn('openapi: wrote stub spec to', jsonPath);
}

const res = spawnSync(process.execPath, ['-r', 'ts-node/register', 'scripts/generate-openapi.ts'], {
  stdio: 'inherit', env: { ...process.env, SKIP_DB_CONNECT_FOR_DOCS: process.env.SKIP_DB_CONNECT_FOR_DOCS || '1' }
});
if (res.status !== 0) {
  writeStub();
  process.exit(0);
}
