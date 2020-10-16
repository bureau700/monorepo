import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { Connection, ConnectionOptions } from 'typeorm';
import { createConnection } from '.';
import { execWithSpinner } from '../lib/cli/spinner';

const fastifyTypeOrmPlugin: FastifyPluginAsync<ConnectionOptions> = async (instance, options) => {
  await execWithSpinner(async () => {
    const connection = await createConnection(options);
    instance.decorate('orm', connection);
    instance.addHook('onClose', () => {
      instance.orm.close();
    });
  }, 'Init Fastify TypeOrm plugin');
};

export default fp(fastifyTypeOrmPlugin, { name: 'TypeOrm' });

declare module 'fastify' {
  export interface FastifyInstance {
    orm: Connection;
  }
}
