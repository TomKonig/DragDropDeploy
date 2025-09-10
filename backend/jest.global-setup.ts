import { GenericContainer, StartedTestContainer, Wait } from 'testcontainers';

let container: StartedTestContainer;

export default async () => {
  container = await new GenericContainer('postgres:15')
    .withEnvironment({
      POSTGRES_PASSWORD: 'postgres',
      POSTGRES_USER: 'postgres',
      POSTGRES_DB: 'dragdropdeploy_test',
    })
    .withExposedPorts(5432)
    .withWaitStrategy(Wait.forLogMessage('database system is ready to accept connections'))
    .start();

  const host = container.getHost();
  const port = container.getMappedPort(5432);
  process.env.DATABASE_URL = `postgresql://postgres:postgres@${host}:${port}/dragdropdeploy_test`;
  process.env.JWT_SECRET = process.env.JWT_SECRET || 'testsecret_testsecret';
  process.env.JWT_EXPIRES_IN = '15m';
  process.env.NODE_ENV = 'test';

  // Store container id/port for teardown
  (global as any).__TESTCONTAINERS__ = { container };

  // Apply schema (migrations first, fallback to db push if none)
  const { default: execa } = await import('execa');
  try {
    await execa('npx', ['prisma', 'migrate', 'deploy'], { stdio: 'inherit', cwd: process.cwd() });
  } catch (e) {
    // likely no migrations yet; fallback
    await execa('npx', ['prisma', 'db', 'push', '--accept-data-loss'], { stdio: 'inherit', cwd: process.cwd() });
  }
};
