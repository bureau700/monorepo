import createHttpError from 'http-errors';
import { JWK, JWT } from 'jose';

const jwtSecret = process.env.JWT_SECRET;
const jwtTokenLife = process.env.JWT_TOKEN_LIFE;
const jwtIssuer = process.env.JWT_ISSUER;

export type TokenPayload = {
  email?: string;
};

function checkJwtSecret() {
  if (!jwtSecret) {
    console.error("JWT secret null. Authentication can't be processed.");

    // FIXME: send unauthorized.
    throw new createHttpError.UnauthorizedError();
  }
}

export function createToken(email: string): string {
  checkJwtSecret();

  const payload: TokenPayload = { email };

  const key = JWK.asKey({
    kty: 'oct',
    k: jwtSecret,
  });

  return JWT.sign(payload, key, {
    expiresIn: jwtTokenLife,
    header: {
      typ: 'JWT',
    },
    issuer: jwtIssuer,
  });
}

export function decodeToken(token: string) {
  checkJwtSecret();

  const key = JWK.asKey({
    kty: 'oct',
    k: jwtSecret,
  });

  return JWT.verify(token, key) as TokenPayload;
}
