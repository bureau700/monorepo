import {FastifyPluginAsync} from 'fastify';
import {capitalize} from '@monorepo/utils';

export const pingServicePath = '/ping';

const pingService: FastifyPluginAsync = async (fastify) => {
  fastify.get(pingServicePath, async () => capitalize('pong'));
};

export default pingService;
