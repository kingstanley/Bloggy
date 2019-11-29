import { PostService } from './../post/post.service';
import { Controller , Get, Render, Res} from '@nestjs/common';

@Controller("/")
export class AppController {
    constructor(private postService: PostService){}
    @Get()
    // @Render("index")
   async root(@Res()res){
        const tags = await  this.postService.allTags();
        
        return res.redirect("posts/")
    }
}
