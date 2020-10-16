const baseConfig = require('./jest.config');

module.exports = {
  ...baseConfig,
  testMatch: ['**/tests/e2e/**/?(*.)+(spec|test).[jt]s?(x)'],
};
