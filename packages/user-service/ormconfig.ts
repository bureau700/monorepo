import { ConnectionOptions } from 'typeorm';
import { Token } from './src/database/entities/Token';
import { User } from './src/database/entities/User';

export default {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: true,
  entities: [User, Token],
} as ConnectionOptions;
