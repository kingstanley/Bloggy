import { Comment } from './entity/comment.entity';
import { CommentDto } from './dto/comment.dto';
import { Tag } from './entity/tag.entity';
import { User } from './../user/user.entity';
import { PostDto } from './dto/post.dto';
import { Repository } from 'typeorm';
import { Posts } from './entity/post.entity';
export declare class PostsRepository extends Repository<Posts> {
    findByTitle(title: string): Promise<Posts>;
    findById(id: string): Promise<Posts>;
    findAllByAuthorId(authorId: string): Promise<Posts[]>;
    my(user: User): Promise<Posts[]>;
    comment(commentDto: CommentDto, user: User): Promise<Comment>;
    findAll(searchText?: string): Promise<Posts[]>;
    createPosts(postDto: PostDto, user: User): Promise<Posts>;
    allTags(): Promise<Tag[]>;
    findTags(tag: string): Promise<Tag[]>;
    findAllPostWithTag(tag: string): Promise<Posts[]>;
}
