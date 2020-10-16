import { FastifyPluginCallback } from 'fastify';
import createHttpError from 'http-errors';
import { getLogger } from '../lib/logger';

const logger = getLogger();

interface IHeaders {
  authorization: string;
}

const SigninController: FastifyPluginCallback = async (fastify) => {
  const { userService } = fastify.services;

  fastify.post<{ Headers: IHeaders }>('/signin', async (request) => {
    try {
      const [username, password] = getUsernameAndPassword(request.headers.authorization);
      const authenticationResult = await userService.authenticate(username, password);
      if (!authenticationResult || authenticationResult.token) throw new createHttpError.BadRequest();
      return authenticationResult;
    } catch (err) {
      logger.log(err);
      throw err;
    }
  });

  function getUsernameAndPassword(authorizationHeader: string): string[] {
    const [type, value] = authorizationHeader.split(/\s+/);
    if (type.toLowerCase() !== 'basic') throw new createHttpError.BadRequest();

    const decodedValue = Buffer.from(value.trim(), 'base64').toString('ascii');

    try {
      const valueArray = decodedValue.split(':');
      if (valueArray.length !== 2) throw new createHttpError.BadRequest();
      return valueArray;
    } catch (err) {
      throw new createHttpError.BadRequest();
    }
  }
};

export default SigninController;
