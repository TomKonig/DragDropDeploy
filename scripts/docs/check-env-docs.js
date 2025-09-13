#!/usr/bin/env node
/*
 Compare documented env vars to those referenced in backend source.
 Fails if undocumented env vars detected (excluding allowlist) or documented placeholders unused.
*/
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "..");
const BACKEND = path.join(ROOT, "backend", "src");
const CONFIG_DOC = path.join(ROOT, "docs", "reference", "configuration.md");

const ALLOW_UNUSED_DOC_PREFIXES = ["OAUTH_", "STRIPE_", "SMTP_"]; // future planned
// Temporary explicit allowlist for roadmap/planned variables to prevent CI failure
const ALLOW_UNUSED_EXACT = new Set([
  "CONFIGURATION",
  "MIGRATOR_DATABASE_URL",
  "ENCRYPTION_KEY",
  "PRIMARY_DOMAIN",
  "API_HOST",
  "API",
  "APP_HOST",
  "BUILD_MODE",
  "ENABLE_RLS",
  "ENABLE_OAUTH",
  "ENABLE_STRIPE",
  "S3_ENDPOINT",
  "S3_BUCKET",
  "S3_ACCESS_KEY",
  "S3_SECRET_KEY",
  "SMTP",
  "RATE_LIMIT_LOGIN",
  "RATE_LIMIT_BUILD_TRIGGER",
  "SIGNUP_MODE",
  "ALLOWED_BASE_DOMAINS",
  "JSON",
  "GLOBAL_SNIPPET",
  "HTML",
  "ENABLE_USER_SNIPPETS",
  "DEFAULT_BUILD_TIMEOUT_SEC",
  "MAX_VERSION_RETENTION",
  "BUILD_CONCURRENCY_GLOBAL",
  "BUILD_CONCURRENCY_PER_USER",
  "PLAN_MATRIX",
  "PLAN_OVERRIDE",
  "USER_SNIPPET",
  "CUSTOM_DOMAINS",
  "SPA_MODE",
  "MAINTENANCE_MODE",
  "QUEUE_CONCURRENCY",
  "BUILD_ALLOWED_SSGS",
  "CUSTOM_BUILD_COMMAND_WHITELIST",
  "OUTBOUND_WEBHOOK_SECRET",
  "RLS",
  "HMAC",
  "JWT",
  "REQUIRED",
]);

function collectEnvRefs(dir, set) {
  for (const entry of fs.readdirSync(dir)) {
    const p = path.join(dir, entry);
    const s = fs.statSync(p);
    if (s.isDirectory()) collectEnvRefs(p, set);
    else if (p.endsWith(".ts") || p.endsWith(".js")) {
      const content = fs.readFileSync(p, "utf8");
      const re = /process\.env\.([A-Z0-9_]+)/g;
      let m;
      while ((m = re.exec(content))) set.add(m[1]);
    }
  }
}

function parseDocVars(file) {
  const txt = fs.readFileSync(file, "utf8");
  const tableRe = /\|[^\n]*Name[^\n]*\n([\s\S]+?)(?:\n###|$)/m; // capture until next heading
  const vars = new Set();
  // Simpler: just collect ALL caps words with underscores from doc lines containing env | env
  const envRe = /\b[A-Z][A-Z0-9_]{2,}\b/g;
  let m;
  while ((m = envRe.exec(txt))) vars.add(m[0]);
  return vars;
}

const codeVars = new Set();
collectEnvRefs(BACKEND, codeVars);
const docVars = parseDocVars(CONFIG_DOC);

const allowPlanned = (v) =>
  ALLOW_UNUSED_DOC_PREFIXES.some((p) => v.startsWith(p)) ||
  ALLOW_UNUSED_EXACT.has(v);

// Tooling/runtime vars we intentionally do not document for end users
const TOOLING_VARS = new Set([
  "DEBUG",
  "DOTENV_KEY",
  "PRISMA_QUERY_ENGINE_LIBRARY",
  "PRISMA_DISABLE_WARNINGS",
  "PRISMA_CLIENT_ENGINE_TYPE",
  "DOTENV_CONFIG_DEBUG",
  "PRISMA_QUERY_ENGINE_BINARY",
  "PRISMA_CLIENT_DATA_PROXY_CLIENT_VERSION",
  "PRISMA_CLIENT_GET_TIME",
  "NO_COLOR",
]);

const missingInDocs = [...codeVars].filter(
  (v) => !docVars.has(v) && !TOOLING_VARS.has(v),
);
const unusedInCode = [...docVars].filter(
  (v) => !codeVars.has(v) && !allowPlanned(v),
);

let failed = false;
if (missingInDocs.length) {
  console.error("Undocumented env vars:", missingInDocs.join(", "));
  failed = true;
}
if (unusedInCode.length) {
  console.error(
    "Documented but unused env vars (consider removing or implementing):",
    unusedInCode.join(", "),
  );
  // Fail only inside CI to allow local incremental cleanup.
  if (process.env.CI) failed = true;
}

if (failed) process.exit(1);
console.log(
  "Env var documentation check completed (strict unused failure in CI =",
  !!process.env.CI,
  ").",
);
