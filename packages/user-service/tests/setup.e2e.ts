import path from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { cleanDatabase } from '../src/database/utils/db-cleaner';
import { loadFixtures } from '../src/database/utils/load-fixtures';

export default async function setupJest() {
  process.env.NODE_ENV = 'test';
  // eslint-disable-next-line global-require
  require('@jison/dotenv-load')();
  // eslint-disable-next-line global-require
  const ormConfig = require('../ormconfig').default;

  await cleanDatabase((ormConfig as PostgresConnectionOptions).url);
  await loadFixtures(path.join(__dirname, 'fixtures'), ormConfig);
}
