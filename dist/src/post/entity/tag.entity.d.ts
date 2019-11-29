import { BaseModel } from '../../basemodel';
import { Posts } from './post.entity';
export declare class Tag extends BaseModel {
    tag: string;
    posts: Posts[];
}
