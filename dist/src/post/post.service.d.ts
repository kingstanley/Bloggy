import { Comment } from "./entity/comment.entity";
import { CommentDto } from "./dto/comment.dto";
import { User } from "./../user/user.entity";
import { PostDto } from "./dto/post.dto";
import { PostsRepository } from "./post.repository";
import { Posts } from "./entity/post.entity";
import { Tag } from "./entity/tag.entity";
export declare class PostService {
    private postRepo;
    constructor(postRepo: PostsRepository);
    findByTitle(title: string): Promise<Posts>;
    findById(id: string): Promise<Posts>;
    findByAuthor(authorId: string): Promise<Posts[]>;
    my(user: User): Promise<Posts[]>;
    createPost(postDto: PostDto, user: User): Promise<Posts>;
    findAll(searchText?: string): Promise<Posts[]>;
    findTags(tag: string): Promise<Tag[]>;
    allTags(): Promise<Tag[]>;
    comment(comment: CommentDto, user: User): Promise<Comment>;
    findAllPostWithTag(tag: string): Promise<Posts[]>;
}
