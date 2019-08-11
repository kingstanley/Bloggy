import { Like } from './../post/entity/like.entity';
import { Entity, Unique, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { BaseModel } from '../basemodel';
import * as bcrypt from 'bcrypt';
import { Posts } from '../post/entity/post.entity';
import { Comment } from '../post/entity/comment.entity';

@Entity()
@Unique(['username', 'email'])
export class User extends BaseModel {
  @Column({ length: 50 })
  username: string;
  @Column({ length: 100 })
  email: string;
  @Column()
  password: string;
  @Column() salt: string;
  @Column({ nullable: true })
  firstName: string;
  @Column({ nullable: true })
  otherNames: string;
  @Column({ length: 500, nullable: true })
  about?: string;

  @OneToOne(type => Like, like => like.user)
  like: Like;

  @OneToMany(type => Posts, post => post.user,{cascade:true, eager:false})
    myposts: Posts[];

  @OneToMany(type => Comment, comments => comments.user, { eager: true })
  comments: Comment[];

  @OneToMany(type => Like, like => like.user)
  likes: Like[];

  async validatePassword(password: string): Promise<boolean> {
    const hashedPassword = await bcrypt.hash(password, this.salt);
    return this.password === hashedPassword;
  }
}
