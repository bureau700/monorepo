import * as Fastify from 'fastify'
import pingService, {pingServicePath} from '@monorepo/ping-service'

start().catch((err) => console.error(err));

async function start() {
  const fastify = Fastify.fastify({
      logger: true
  })
  
  console.log(pingServicePath);
  
  fastify.register(pingService);
  
  try {
    await fastify.listen(3000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}
