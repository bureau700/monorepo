import { Static, Type } from '@sinclair/typebox';
import { FastifyPluginCallback } from 'fastify';
import createHttpError from 'http-errors';
import { User } from '../../database/entities/User';
import UserRepository from '../../database/repositories/user-repository';

const signupSchema = Type.Object({
  email: Type.String({ format: 'email' }),
  password: Type.String({ minLength: 3, maxLength: 64 }),
});

type TSignup = Static<typeof signupSchema>;

const SignupController: FastifyPluginCallback = async (fastify) => {
  const userRepository = fastify.orm.getCustomRepository(UserRepository);

  fastify.post<{ Body: TSignup }>(
    '/signup',
    {
      schema: {
        body: signupSchema,
      },
    },
    async (request) => {
      const user = await createUser(request.body);
      return user;
    },
  );

  async function createUser({ email, password }: TSignup): Promise<User> {
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new createHttpError.Conflict('Email already used');
    }

    const user = new User();
    user.email = email;
    user.setPassword(password);
    return (await user.save()).safeValue();
  }
};

export default SignupController;
