import { getRepository } from 'typeorm';
import { FastifyPluginCallback } from 'fastify';
import createError from 'http-errors';
import { User } from '../database/entities/User';

interface IParam {
  id: string;
}

const UserController: FastifyPluginCallback = async (fastify) => {
  const repository = getRepository(User);

  fastify.get('/', async () => repository.find());

  fastify.get<{ Params: IParam }>('/:id', async (request) => getOne(request.params.id));

  fastify.post<{ Body: Partial<User> }>('/', async (request) => {
    const result = await repository.save(request.body);
    return result.safeValue();
  });

  fastify.patch<{ Body: Partial<User>; Params: IParam }>('/:id', async (request) => {
    const existingUser = await getOne(request.params.id);
    if (existingUser) {
      User.merge(existingUser, request.body);
      return existingUser.save();
    }
    return null;
  });

  fastify.delete<{ Params: IParam }>('/:id', async (request) => {
    const userToDelete = await getOne(request.params.id);
    if (userToDelete) repository.softDelete(userToDelete);
    return {
      id: request.params.id,
      object: User.name,
      deleted: true,
    };
  });

  async function getOne(userId: string) {
    const user = await repository.findOne(userId);
    if (!user) throw new createError.NotFound();
    return user;
  }
};

export default UserController;
