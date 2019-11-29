import { Like } from "./../post/entity/like.entity";
import { BaseModel } from "../basemodel";
import { Posts } from "../post/entity/post.entity";
import { Comment } from "../post/entity/comment.entity";
export declare class User extends BaseModel {
    username: string;
    email: string;
    password: string;
    salt: string;
    firstName: string;
    otherNames: string;
    about?: string;
    avatar: string;
    token: string;
    tokenExpiresAt: number;
    confirmedEmail: boolean;
    confirmedPhone: boolean;
    like: Like;
    myposts: Posts[];
    comments: Comment[];
    likes: Like[];
    validatePassword(password: string): Promise<boolean>;
}
