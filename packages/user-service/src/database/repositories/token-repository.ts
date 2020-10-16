import { EntityRepository, Repository } from 'typeorm';
import { Token } from '../entities/Token';
import { User } from '../entities/User';

@EntityRepository(Token)
export default class TokenRepository extends Repository<Token> {
  async findByUser(user: User) {
    return this.findOne({ where: { user } });
  }
}
