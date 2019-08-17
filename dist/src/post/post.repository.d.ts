import { User } from './../user/user.entity';
import { PostDto } from './dto/post.dto';
import { Repository } from 'typeorm';
import { Posts } from './entity/post.entity';
export declare class PostsRepository extends Repository<Posts> {
    findByTitle(title: string): Promise<Posts>;
    findById(id: string): Promise<Posts>;
    findAllByAuthorId(authorId: string): Promise<Posts[]>;
    createPosts(postDto: PostDto, user: User): Promise<Posts>;
}
