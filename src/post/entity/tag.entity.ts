import { BaseModel } from '../../basemodel';
import { Posts } from './post.entity'; 
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';


@Entity()
export class Tag extends BaseModel {
  @Column()
  tag: string;
 
  @ManyToMany(type => Posts, post => post.tags)
  posts: Posts[]
}

