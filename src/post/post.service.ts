import { User } from './../user/user.entity';
import { AuthCredentialsDto } from './../user/dto/auth-credentials.dto';
import { PostDto } from './dto/post.dto';
import { PostsRepository } from './post.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from './entity/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostsRepository) private postRepo: PostsRepository,
  ) {}

  async findByTitle(title: string): Promise<Posts> {
    return this.postRepo.findByTitle(title);
  }
  async findById(id: string): Promise<Posts> {
    return this.postRepo.findById(id);
  }

  async createPost(postDto: PostDto, user: User): Promise<Posts> {
    // console.log('user in service: ', user, postDto)
    return this.postRepo.createPosts(postDto, user);
  }
}
