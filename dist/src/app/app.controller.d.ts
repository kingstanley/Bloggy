import { PostService } from './../post/post.service';
export declare class AppController {
    private postService;
    constructor(postService: PostService);
    root(res: any): Promise<any>;
}
