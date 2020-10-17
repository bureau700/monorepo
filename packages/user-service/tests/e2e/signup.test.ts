import faker from 'faker';
import { User } from '../../src/database/entities/User';

describe('signup controller', () => {
  // let app: AppType;
  let app: any;

  beforeAll(async () => {
    // app = await buildApp();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/v1/signup', () => {
    describe('nominal conditions', () => {
      const email = faker.internet.email();
      const postData = {
        email,
        password: faker.internet.password(),
      };
      let response: any;

      beforeAll(async () => {
        response = await app.inject().post('/v1/signup').body(postData);
      });

      it('should return the created user', async () => {
        expect(response.json()).toMatchObject({
          id: expect.toStartWith(User.prefix),
          email,
          createdAt: expect.toBeString(),
          updatedAt: expect.toBeString(),
        });
      });

      it('should not return the password account', async () => {
        expect(response.json()).not.toHaveProperty('password');
      });
    });

    describe('when email already exist', () => {
      const email = faker.internet.email();
      const postData = {
        email,
        password: faker.internet.password(),
      };
      let response: any;

      beforeAll(async () => {
        await app.inject().post('/v1/signup').body(postData);
        response = await app.inject().post('/v1/signup').body(postData);
      });

      it('should return the right error', async () => {
        expect(response.json()).toMatchObject({
          error: 'Conflict',
          message: 'Email already used',
          statusCode: 409,
        });
      });

      it('should return conflict status code', async () => {
        expect(response.statusCode).toStrictEqual(409);
      });
    });

    describe('when email is malformed', () => {
      const postData = {
        email: 'bad-email',
        password: faker.internet.password(),
      };
      let response: any;

      beforeAll(async () => {
        response = await app.inject().post('/v1/signup').body(postData);
      });

      it('should return the right error', async () => {
        expect(response.json()).toMatchObject({
          error: 'BadRequest',
          message: 'Validation error',
          statusCode: 400,
          errors: [
            {
              field: 'email',
              rules: 'format',
              params: { format: 'email' },
              message: expect.toBeString(),
            },
          ],
        });
      });
    });

    describe('when email is empty', () => {
      const postData = {
        password: faker.internet.password(),
      };
      let response: any;

      beforeAll(async () => {
        response = await app.inject().post('/v1/signup').body(postData);
      });

      it('should return the right error', async () => {
        expect(response.json()).toMatchObject({
          error: 'BadRequest',
          message: 'Validation error',
          statusCode: 400,
          errors: [
            {
              field: 'email',
              rules: 'required',
              params: { missingProperty: 'email' },
              message: expect.toBeString(),
            },
          ],
        });
      });
    });

    describe('when password is too short', () => {
      const email = faker.internet.email();
      const postData = {
        email,
        password: 'a',
      };
      let response: any;

      beforeAll(async () => {
        response = await app.inject().post('/v1/signup').body(postData);
      });

      it('should return the right error', async () => {
        expect(response.json()).toMatchObject({
          error: 'BadRequest',
          message: 'Validation error',
          statusCode: 400,
          errors: [
            {
              field: 'password',
              rules: 'minLength',
              params: { limit: 3 },
              message: expect.toBeString(),
            },
          ],
        });
      });
    });

    describe('when password is empty', () => {
      const postData = {
        email: faker.internet.email(),
      };
      let response: any;

      beforeAll(async () => {
        response = await app.inject().post('/v1/signup').body(postData);
      });

      it('should return the right error', async () => {
        expect(response.json()).toMatchObject({
          error: 'BadRequest',
          message: 'Validation error',
          statusCode: 400,
          errors: [
            {
              field: 'password',
              rules: 'required',
              params: { missingProperty: 'password' },
              message: expect.toBeString(),
            },
          ],
        });
      });
    });
  });
});
