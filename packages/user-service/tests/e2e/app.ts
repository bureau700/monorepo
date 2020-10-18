import * as Fastify from 'fastify';
import userService from '../../src';

export type AppType = ReturnType<typeof buildApp>;

export function buildApp() {
  const fastify = Fastify.fastify();
  fastify.register(userService);
  return fastify;
}
