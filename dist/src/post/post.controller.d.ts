import { Posts } from './entity/post.entity';
import { PostService } from './post.service';
import { CommentDto } from './dto/comment.dto';
import { User } from '../user/user.entity';
export declare class PostController {
    private postService;
    constructor(postService: PostService);
    index(): Promise<{
        posts: Posts[];
        tags: import("./entity/tag.entity").Tag[];
    }>;
    findByTagr(id: string): Promise<{
        posts: Posts[];
        tags: import("./entity/tag.entity").Tag[];
    }>;
    findByAuthor(id: string): Promise<{
        posts: Posts[];
        tags: import("./entity/tag.entity").Tag[];
    }>;
    view(id: any): Promise<{
        post: Posts;
        tags: import("./entity/tag.entity").Tag[];
    }>;
    comment(id: string, comment: CommentDto, user: User, res: any): Promise<void>;
}
