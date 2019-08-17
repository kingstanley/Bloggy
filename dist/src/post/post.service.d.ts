import { User } from './../user/user.entity';
import { PostDto } from './dto/post.dto';
import { PostsRepository } from './post.repository';
import { Posts } from './entity/post.entity';
export declare class PostService {
    private postRepo;
    constructor(postRepo: PostsRepository);
    findByTitle(title: string): Promise<Posts>;
    findById(id: string): Promise<Posts>;
    createPost(postDto: PostDto, user: User): Promise<Posts>;
    findAll(): Promise<Posts[]>;
}
