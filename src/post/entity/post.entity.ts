import { BaseModel } from '../../basemodel';

import { Comment } from './comment.entity';
import { User } from './../../user/user.entity';
import {
  Entity,
  Column,
  ManyToOne,
  ManyToMany,
  OneToMany,
  OneToOne,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { Tag } from './tag.entity';
import { Like } from './like.entity';

@Entity('post')
export class Posts extends BaseModel {
  @Column()
  title: string;
  @Column() slug: string;
  @Column() status: string;

  @Column() allowComments: boolean;
  // @Column('uuid')
  // userId: string;
  @Column('text')
  content: string;

  @ManyToOne(type => User, user => user.myposts)
  // @JoinColumn({name:'userId'})
  user: User;

  @ManyToMany(type => Tag,{cascade:true})
  @JoinTable()
  tags: Tag[];

  @OneToMany(type => Comment, comment => comment.postId   )
  comments: Comment[];

  @OneToMany(type => Like, like => like.post)
  likes: Like[];
}
