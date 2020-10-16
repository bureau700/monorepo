import { Connection } from 'typeorm';
import { createToken } from '../lib/security/jwt';
import { encodePassword } from '../lib/security/password';
import { Token } from '../database/entities/Token';
import TokenRepository from '../database/repositories/token-repository';
import UserRepository from '../database/repositories/user-repository';

export default class UserService {
  userRepository: UserRepository;

  tokenRepository: TokenRepository;

  constructor(connection: Connection) {
    this.userRepository = connection.getCustomRepository(UserRepository);
    this.tokenRepository = connection.getCustomRepository(TokenRepository);
  }

  async authenticate(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) return null;

    if (user.getEncodedPassword() === encodePassword(password)) {
      // Create token or reuse an existant one.
      let token = (await this.tokenRepository.findByUser(user)) || new Token();
      token.token = createToken(email);
      token.user = user;
      token = await token.save();
      return {
        token: token.token,
      };
    }

    return null;
  }
}
