import { Comment } from "./entity/comment.entity";
import { CommentDto } from "./dto/comment.dto";
import { User } from "./../user/user.entity";
import { AuthCredentialsDto } from "./../user/dto/auth-credentials.dto";
import { PostDto } from "./dto/post.dto";
import { PostsRepository } from "./post.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Posts } from "./entity/post.entity";
import { Tag } from "./entity/tag.entity";

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostsRepository) private postRepo: PostsRepository
  ) {}  

  async findByTitle(title: string): Promise<Posts> {
    return this.postRepo.findByTitle(title);
  }
  async findById(id: string): Promise<Posts> {
    return this.postRepo.findById(id);
  }
  async findByAuthor(authorId: string): Promise<Posts[]> {
    return this.postRepo.findAllByAuthorId(authorId);
  }
  async my(user: User): Promise<Posts[]> {
    return this.postRepo.my(user);
  }

  async createPost(postDto: PostDto, user: User): Promise<Posts> {
    // console.log('user in service: ', user, postDto)
    return this.postRepo.createPosts(postDto, user);
  }
  async findAll(searchText?: string): Promise< Posts[]> {
    return await this.postRepo.findAll(searchText);
  }
  async findTags(tag: string): Promise<Tag[]> {
    return this.postRepo.findTags(tag);
  }
  async allTags(): Promise<Tag[]>{
    return this.postRepo.allTags();
  }
  comment(comment: CommentDto, user: User): Promise<Comment> {
    return this.postRepo.comment(comment, user);
  }
  async findAllPostWithTag(tag: string): Promise<Posts[]>{
    return this.postRepo.findAllPostWithTag(tag);
  }
}
