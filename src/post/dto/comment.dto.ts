import { IsString } from "class-validator";

export class CommentDto{
    @IsString()
    postId: string;

    @IsString()
    comment: string;
}