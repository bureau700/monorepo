import { monotonicFactory } from 'ulid';
import {
  Entity,
  Column,
  BeforeInsert,
  PrimaryColumn,
  BaseEntity,
  Index,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { encodePassword } from '../../lib/security/password';

const ulid = monotonicFactory();
const PREFIX = 'user';

@Entity()
export class User extends BaseEntity {
  static prefix = PREFIX;

  @PrimaryColumn()
  id!: string;

  @Column({ length: 64, nullable: true })
  // @Length(1, 64)
  firstName?: string;

  @Column({ length: 64, nullable: true })
  // @Length(1, 64)
  lastName?: string;

  @Index({ unique: true })
  @Column()
  // @IsEmail()
  email?: string = '';

  @Column({ select: false, nullable: true })
  private password?: string;

  @Column({ default: false })
  isActive?: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;

  @DeleteDateColumn({ select: false, type: 'timestamp' })
  deletedAt?: Date;

  @BeforeInsert()
  private beforeInsert() {
    this.id = `${PREFIX}_${ulid()}`;
  }

  setPassword(password: string) {
    this.password = encodePassword(password);
    return this;
  }

  getEncodedPassword() {
    return this.password;
  }

  safeValue(): User {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { deletedAt, password, ...user } = this;
    const safeUser = new User();
    return Object.assign(safeUser, user);
  }
}
