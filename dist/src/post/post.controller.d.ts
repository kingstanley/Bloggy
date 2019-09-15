import { Comment } from "./entity/comment.entity";
import { CommentDto } from "./dto/comment.dto";
import { User } from "./../user/user.entity";
import { PostDto } from "./dto/post.dto";
import { PostService } from "./post.service";
import { Posts } from "./entity/post.entity";
import { Tag } from "./entity/tag.entity";
export declare class PostController {
    private postService;
    constructor(postService: PostService);
    allTags(): Promise<Tag[]>;
    findById(id: string): Promise<Posts>;
    findByTitle(title: string): Promise<Posts>;
    findByAuthor(authorId: string): Promise<Posts[]>;
    my(user: User): Promise<Posts[]>;
    findAll(): Promise<Posts[]>;
    createPost(createPostDto: PostDto, user: User): Promise<Posts>;
    uploadFile(files: any): void;
    findTags(tag: string): Promise<Tag[]>;
    comment(comment: CommentDto, user: User): Promise<Comment>;
}
