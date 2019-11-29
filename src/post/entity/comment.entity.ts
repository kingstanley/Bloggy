import { Posts } from './post.entity';
import { User } from './../../user/user.entity';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { BaseModel } from '../../basemodel';


@Entity()
export class Comment extends BaseModel {
  @Column('text') 
  content: string;
  @Column('uuid') postId: string;
  @Column() status: string;
  @ManyToOne(type => User, user => user.comments, { eager: true })
  user: User;

  @ManyToOne(type => Posts, posts => posts.comments, { eager: false })
  post: Posts;
}
