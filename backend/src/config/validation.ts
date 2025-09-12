import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'test', 'production').default('development'),
  PORT: Joi.number().default(3000),
  DATABASE_URL: Joi.string().uri().when('$docGen', { is: true, then: Joi.string().default('postgres://user:pass@localhost:5432/db'), otherwise: Joi.required() }),
  JWT_SECRET: Joi.string().when('$docGen', { is: true, then: Joi.string().default('docgen-secret'), otherwise: Joi.required() }),
  JWT_EXPIRES_IN: Joi.string().default('15m'),
  RLS_ENABLED: Joi.string().valid('true', 'false').default('false'),
  BUILD_MODE: Joi.string().valid('local', 'docker').default('local'),
  MAX_UPLOAD_MB: Joi.number().integer().min(1).max(500).default(25), // Ensure this is correctly validated
  STORAGE_ROOT: Joi.string().default('./data/storage'),
  ARTIFACTS_DIR: Joi.string().default('./artifacts'),
  OPERATOR_BOOTSTRAP_PASSWORD: Joi.string().min(12).optional(),
  OPERATOR_BOOTSTRAP_EMAIL: Joi.string().email().optional(),
  METRICS_IP_ALLOWLIST: Joi.string().optional().description('Comma separated list of IPs allowed to access /metrics'),
  FORCE_MINIFY: Joi.string().valid('1','0').optional().description('Override project setting: 1 force enable minification, 0 force disable'),
  BUILD_FLAGS_ALLOWLIST: Joi.string().optional().description('Comma separated allowed build flags, e.g. "--minify,--base,--drafts"'),
});
