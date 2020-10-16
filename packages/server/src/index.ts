import * as Fastify from 'fastify';
import fastifySwagger from 'fastify-swagger';
import pingService from '@monorepo/ping-service';
import userService from '@monorepo/user-service';

const activateSwagger = process.env.NODE_ENV === 'development';

start().catch((err) => console.error(err));

async function start() {
  const fastify = Fastify.fastify({
    logger: true,
  });

  fastify.register(fastifySwagger, {
    routePrefix: '/documentation',
    exposeRoute: activateSwagger,
  });

  fastify.register(pingService);
  fastify.register(userService);

  try {
    await fastify.listen(3000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}
