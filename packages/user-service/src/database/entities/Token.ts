import { Entity, Column, JoinColumn, OneToOne, Index, BaseEntity, PrimaryColumn, BeforeInsert } from 'typeorm';
import { ulid } from 'ulid';
// eslint-disable-next-line import/no-cycle
import { User } from './User';

const PREFIX = 'token';

@Entity('Token')
export class Token extends BaseEntity {
  static prefix = PREFIX;

  @PrimaryColumn('uuid')
  id?: string;

  @Column({ nullable: false })
  @Index()
  token?: string;

  @OneToOne(() => User, { nullable: false })
  @JoinColumn()
  user?: User;

  @BeforeInsert()
  private beforeInsert() {
    this.id = `${PREFIX}_${ulid()}`;
  }
}
