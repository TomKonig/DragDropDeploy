// Test environment bootstrap for e2e tests
process.env.NODE_ENV = process.env.NODE_ENV || 'test';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'testsecret_testsecret';
process.env.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15m';
// IMPORTANT: provide a valid reachable Postgres test database
// Adjust credentials as needed for local docker-compose or dev instance.
process.env.DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/dragdropdeploy_test';
