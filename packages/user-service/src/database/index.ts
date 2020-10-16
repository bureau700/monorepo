import path from 'path';
import { createConnection as _createConnection, ConnectionOptions } from 'typeorm';
import { PostgresConnectionCredentialsOptions } from 'typeorm/driver/postgres/PostgresConnectionCredentialsOptions';
import { cleanDatabase } from './utils/db-cleaner';
import { execWithSpinner } from '../lib/cli/spinner';
import { loadFixtures } from './utils/load-fixtures';

const FIXTURES_PATH = path.join(__dirname, 'fixtures');

export interface DatabaseOptions {
  clearDatabase: boolean;
}

export async function initDatabase({ clearDatabase }: DatabaseOptions) {
  // eslint-disable-next-line global-require
  const ormConfig = require('../../ormconfig').default;

  if (clearDatabase) {
    await _cleanDatabase(ormConfig);
  }

  await _createBaseResources(ormConfig);
}

// eslint-disable-next-line no-underscore-dangle
export async function createConnection(ormConfig: ConnectionOptions) {
  return execWithSpinner(async () => _createConnection(ormConfig), 'Connect to database...');
}

// eslint-disable-next-line no-underscore-dangle
async function _createBaseResources(ormConfig: ConnectionOptions) {
  await execWithSpinner(async () => {
    await loadFixtures(FIXTURES_PATH, ormConfig);
  }, 'Creating resources...');
}

// eslint-disable-next-line no-underscore-dangle
async function _cleanDatabase(ormConfig: ConnectionOptions) {
  await execWithSpinner(
    () => cleanDatabase((ormConfig as PostgresConnectionCredentialsOptions).url),
    'Cleaning database...',
  );
}
