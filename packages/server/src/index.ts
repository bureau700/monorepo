import * as Fastify from 'fastify';
import fastifySwagger from 'fastify-swagger';
import pingService from '@jison/ping-service';
import userService from '@jison/user-service';

// const activateSwagger = process.env.NODE_ENV === 'development';
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

start().catch((err) => console.error(err));

async function start() {
  const fastify = Fastify.fastify({
    logger: true,
  });

  fastify.register(fastifySwagger, {
    routePrefix: '/documentation',
    exposeRoute: true,
  });

  fastify.register(pingService);
  fastify.register(userService);

  try {
    await fastify.listen(PORT);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}
