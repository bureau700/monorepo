import { FastifyPluginAsync } from 'fastify';

export const pingServicePath = '/v1/ping';

const pingService: FastifyPluginAsync = async (fastify) => {
  fastify.get(pingServicePath, async () => 'pong');
};

export default pingService;
