import { User } from './../user/user.entity';
import { PostDto } from './dto/post.dto';
import { PostService } from './post.service';
import { Posts } from './entity/post.entity';
export declare class PostController {
    private postService;
    constructor(postService: PostService);
    findById(id: string): Promise<Posts>;
    findByTitle(title: string): Promise<Posts>;
    findAll(): Promise<Posts[]>;
    createPost(createPostDto: PostDto, user: User): Promise<Posts>;
}
