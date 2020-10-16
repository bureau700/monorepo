import path from 'path';
import { Builder, fixturesIterator, Loader, Parser, Resolver } from 'typeorm-fixtures-cli/dist';
import { createConnection, BaseEntity, ConnectionOptions } from 'typeorm';

export async function loadFixtures(fixturesPath: string, ormConfig: ConnectionOptions) {
  let connection;

  try {
    connection = await createConnection(ormConfig);
    await connection.synchronize(true);

    const loader = new Loader();
    loader.load(path.resolve(fixturesPath));

    const resolver = new Resolver();
    const fixtures = resolver.resolve(loader.fixtureConfigs);
    const builder = new Builder(connection, new Parser());

    // eslint-disable-next-line no-restricted-syntax
    for (const fixture of fixturesIterator(fixtures)) {
      // eslint-disable-next-line no-await-in-loop
      const entity = await builder.build(fixture);
      // eslint-disable-next-line no-await-in-loop
      await (entity as BaseEntity).save();
    }
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}
