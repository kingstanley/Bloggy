import { NotificationService } from "../notification/notification/notification.service";
import { Comment } from "./entity/comment.entity";
import { CommentDto } from "./dto/comment.dto";
import { User } from "../user/user.entity";
import { PostDto } from "./dto/post.dto";
import { PostService } from "./post.service";
import { Posts } from "./entity/post.entity";
import { Tag } from "./entity/tag.entity";
export declare class PostApiController {
    private postService;
    private notification;
    constructor(postService: PostService, notification: NotificationService);
    test(): void;
    findAll(): Promise<Posts[]>;
    allTags(): Promise<Tag[]>;
    findById(id: string): Promise<Posts>;
    findByTitle(title: string): Promise<Posts>;
    findByAuthor(authorId: string): Promise<Posts[]>;
    my(user: User): Promise<Posts[]>;
    search(searchText: string): Promise<Posts[]>;
    uploadFile(files: any): void;
    createPost(createPostDto: PostDto, user: User): Promise<Posts>;
    findTags(tag: string): Promise<Tag[]>;
    comment(comment: CommentDto, user: User): Promise<Comment>;
    findAllPostWithTag(tag: string): Promise<Posts[]>;
}
