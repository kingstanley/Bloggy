import { BaseModel } from '../../basemodel';
import { User } from './../../user/user.entity';
import { Posts } from './post.entity';
export declare class Like extends BaseModel {
    postId: string;
    userId: string;
    user: User;
    post: Posts;
}
