import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'test', 'production').default('development'),
  PORT: Joi.number().default(3000),
  DATABASE_URL: Joi.string().uri().required(),
  JWT_SECRET: Joi.string().min(16).required(),
  JWT_EXPIRES_IN: Joi.string().default('15m'),
  ENABLE_RLS: Joi.string().valid('true', 'false').default('false'),
  BUILD_MODE: Joi.string().valid('local', 'docker').default('local'),
  MAX_UPLOAD_MB: Joi.number().integer().min(1).max(500).default(25),
  STORAGE_ROOT: Joi.string().default('./data/storage'),
  OPERATOR_BOOTSTRAP_PASSWORD: Joi.string().min(12).optional(),
  OPERATOR_BOOTSTRAP_EMAIL: Joi.string().email().optional(),
});
