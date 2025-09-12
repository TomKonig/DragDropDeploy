module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  testRegex: '.*\\.(spec|test)\\.(ts|js)$',
  collectCoverageFrom: ['src/**/*.ts', '!src/main.ts'],
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text', 'lcov', 'json-summary'],
  coverageThreshold: {
    global: {
      statements: 55,
      branches: 45,
      functions: 55,
      lines: 55,
    },
  },
  globalSetup: '<rootDir>/jest.global-setup.ts',
  globalTeardown: '<rootDir>/jest.global-teardown.ts',
  setupFilesAfterEnv: [
    '<rootDir>/src/test/jest-setup-after-env.ts',
    ...(process.env.DETECT_OPEN_HANDLES ? ['why-is-node-running'] : [])
  ],
};
