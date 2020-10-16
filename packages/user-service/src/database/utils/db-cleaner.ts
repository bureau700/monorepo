import { Client } from 'pg';

export async function cleanDatabase(databaseUrl?: string) {
  if (!databaseUrl) {
    throw new Error('Please check that DATABASE_URL is configured.');
  }

  if ((!databaseUrl.includes('dev') && !databaseUrl.includes('test')) || databaseUrl.includes('prod')) {
    throw new Error(
      `Environment doesn't seem to be safe to delete database. DATABASE_URL=${databaseUrl.replace(
        /\/\/[^:]+:[^@]*/,
        '//************',
      )}`,
    );
  }

  const client = new Client({
    connectionString: databaseUrl,
  });
  await client.connect();

  const result = await client.query(`
    SELECT
      *
    FROM
      pg_catalog.pg_tables
    WHERE
      schemaname != 'pg_catalog'
    AND schemaname != 'information_schema';
  `);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tables = result.rows.map((row: any) => `"${row.tablename}"`);

  try {
    if (tables.length) {
      const query = `DROP TABLE IF EXISTS ${tables.join(', ')} CASCADE;`;
      await client.query(query);
    }
  } catch (err) {
    console.error(err);
  }

  await client.end();
}
