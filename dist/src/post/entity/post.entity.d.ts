import { BaseModel } from '../../basemodel';
import { Comment } from './comment.entity';
import { User } from './../../user/user.entity';
import { Tag } from './tag.entity';
import { Like } from './like.entity';
export declare class Posts extends BaseModel {
    title: string;
    slug: string;
    status: string;
    videoUrl: string;
    allowComments: boolean;
    userId: string;
    content: string;
    user: User;
    tags: Tag[];
    comments: Comment[];
    likes: Like[];
}
