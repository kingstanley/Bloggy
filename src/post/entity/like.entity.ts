import { BaseModel } from '../../basemodel';
import { User } from './../../user/user.entity';

import { Entity, PrimaryColumn, OneToOne, JoinColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Posts } from './post.entity';

@Entity()
export class Like extends BaseModel {
  @Column('uuid') postId: string;
  @Column('uuid') userId: string;

  @ManyToOne(type => User, user=>user.likes)
  @JoinColumn()
  user: User;

  @ManyToOne(type => Posts, post=> post.likes)
  @JoinColumn()
  post: Posts;
}
