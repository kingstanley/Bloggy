import { Tag } from "../entity/tag.entity";
export declare class PostDto {
    title: string;
    tags: Tag[];
    content: string;
    videoUrl: string;
    status: string;
    allowComments: boolean;
    id?: string;
}
