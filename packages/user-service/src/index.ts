import 'reflect-metadata';
import dotenvLoad from '@jison/dotenv-load';
import { FastifyPluginAsync } from 'fastify';
import fastifyTypeorm from './database/fastify-typeorm-plugin';
import UserController from './controllers/UserController';
import { initDatabase } from './database';
import SigninController from './controllers/SigninController';
import SignupController from './controllers/signup/SignupController';
import fastifyServicePlugin from './services/fastify-service-plugin';
import { handleError } from './lib/http/error-handler';

dotenvLoad();

const clearDatabase = process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development';

const userService: FastifyPluginAsync = async (fastify) => {
  // eslint-disable-next-line global-require
  const ormConfig = require('../ormconfig').default;

  await initDatabase({ clearDatabase });

  fastify.setErrorHandler(handleError);

  // fastify.register(fastifySwagger, {
  //   exposeRoute: true,
  //   logLevel: 'error',
  // });

  await fastify.register(fastifyTypeorm, ormConfig);
  await fastify.register(fastifyServicePlugin);

  fastify.register(SigninController, { prefix: '/v1' });
  fastify.register(SignupController, { prefix: '/v1' });
  fastify.register(UserController, { prefix: '/v1/users' });
};

export default userService;
