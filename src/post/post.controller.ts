import { AuthenticatedGuard } from './../common/guards/authenticated.guard';
import { Posts } from './entity/post.entity';
import { Get, Param, Body, Post, UseGuards, Res } from '@nestjs/common';
import { PostService } from './post.service';
import { Controller, Render } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentDto } from './dto/comment.dto';
import { GetUser } from '../user/get-user.decorator';
import { User } from '../user/user.entity';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}
  @Get()
  @Render('posts/list')
 async index() {
    return {posts: await this.postService.findAll(), tags: await this.postService.allTags()};
  }
  @Get('tag/:id')
  @Render('posts/list')
 async findByTagr(@Param('id')id: string) {
  //  console.log('tag: ', id);
   return {posts: await this.postService.findAllPostWithTag(id),  tags: await this.postService.allTags()};
  }
  @Get('author/:id')
  @Render('posts/list')
 async findByAuthor(@Param('id')id: string) {
    return {posts: await this.postService.findByAuthor(id),  tags: await this.postService.allTags()};
  }
  @Get('view/:id')
  @Render('posts/view')
  async view(@Param('id')id: any) {
    // console.log("id of post: ", id);
    return {post: await this.postService.findById(id), tags: await this.postService.allTags()};
  }

  @Post('comment/:id')
  @UseGuards(AuthenticatedGuard)
  async comment(
    @Param('id')id: string,
    @Body() comment: CommentDto,
    @GetUser() user: User,
    @Res() res
  ) {
    comment.postId = id;
    console.log("Comment: ", comment)
    const comt = await this.postService.comment(comment, user);
    console.log("Comment Saved: ", comt);
    // const post = await this.postService.findById(comt.postId);
    res.redirect(`/posts/view/${comt.postId}`);
  }
}
