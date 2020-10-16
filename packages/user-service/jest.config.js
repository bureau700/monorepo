module.exports = {
  clearMocks: true,
  setupFilesAfterEnv: ['jest-extended'],
  preset: 'ts-jest',
  globalSetup: './tests/setup.unit.ts',
  testEnvironment: 'node',
  testMatch: ['**/tests/unit/**/?(*.)+(spec|test).[jt]s?(x)'],
};
