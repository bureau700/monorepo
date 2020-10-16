import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { execWithSpinner } from '../lib/cli/spinner';
import UserService from './user-service';

const fastifyServicePlugin: FastifyPluginAsync = async (instance) => {
  await execWithSpinner(async () => {
    const services = {
      userService: new UserService(instance.orm),
    };

    instance.decorate('services', services);
  }, 'Init Fastify service layer plugin');
};

export default fp(fastifyServicePlugin, { name: 'Services', dependencies: ['TypeOrm'] });

declare module 'fastify' {
  export interface FastifyInstance {
    services: {
      userService: UserService;
    };
  }
}
