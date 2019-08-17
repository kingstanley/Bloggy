import { Posts } from './post.entity';
import { User } from './../../user/user.entity';
import { BaseModel } from '../../basemodel';
export declare class Comment extends BaseModel {
    content: string;
    postId: string;
    status: string;
    user: User;
    post: Posts;
}
