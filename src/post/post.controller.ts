import { AuthGuard } from '@nestjs/passport';
import { User } from './../user/user.entity';
import { PostDto } from './dto/post.dto';
import { PostService } from './post.service';
import { Controller, Get, Param, Body, Post, UseGuards } from '@nestjs/common';
import { Posts } from './entity/post.entity';
import { GetUser } from '../user/get-user.decorator';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get(':id')
  findById(@Param('id') id: string): Promise<Posts> {
    return this.postService.findById(id);
  }
  @Get('/findbytitle/:id')
  findByTitle(@Param('id') title: string): Promise<Posts> {
    return this.postService.findByTitle(title);
  }

  @Post() 
  @UseGuards(AuthGuard())
  createPost(
    @Body() createPostDto: PostDto,
    @GetUser() user: User,
  ): Promise<Posts> {
    // console.log('user in controller: ',user);
    return this.postService.createPost(createPostDto, user);
  }
}
