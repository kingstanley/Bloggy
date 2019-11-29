import { NotificationService } from "../notification/notification/notification.service";
import { GetUser } from "../user/get-user.decorator";
import { Comment } from "./entity/comment.entity";
import { CommentDto } from "./dto/comment.dto";
import { AuthGuard } from "@nestjs/passport";
import { User } from "../user/user.entity";
import { PostDto } from "./dto/post.dto";
import { PostService } from "./post.service";
import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  Req
} from "@nestjs/common";
import { Posts } from "./entity/post.entity";
import { FileInterceptor, AnyFilesInterceptor } from "@nestjs/platform-express";
import { Tag } from "./entity/tag.entity";
import * as os from "os";

@Controller("post")
export class PostApiController {
  constructor(
    private postService: PostService,
    private notification: NotificationService
  ) {}
  @Get("send-mail")
  test() {
    console.log("mail route");
    return this.notification.newPostNotify();
  }
  @Get("all")
  findAll() {  
    return this.postService.findAll();
  }
  @Get("tags")
  allTags(): Promise<Tag[]> {
    console.log("reaching all tags");
    return this.postService.allTags();
  }
  @Get(":id")
  findById(@Param("id") id: string): Promise<Posts> {
    return this.postService.findById(id);
  }
  @Get("/findbytitle/:id")
  findByTitle(@Param("id") title: string): Promise<Posts> {
    return this.postService.findByTitle(title);
  }

  @Get("findbyauthor/:id")
  findByAuthor(@Param() authorId: string): Promise<Posts[]> {
    return this.postService.findByAuthor(authorId);
  }
 
  @Post("my")
  @UseGuards(AuthGuard())
  my(@GetUser() user: User): Promise<Posts[]> {
    return this.postService.my(user);
  }


  @Get("search/:id")
  search(@Param() searchText: string): Promise<Posts[]> {
    return this.postService.findAll(searchText["id"]);
  }

  
  @Post("upload")
  @UseInterceptors(AnyFilesInterceptor())
  uploadFile(@UploadedFiles() files) {
    // console.log("uploaded files: ", files);
  }
  @Post("save")
  @UseGuards(AuthGuard())
  createPost(
    @Body() createPostDto: PostDto,
    @GetUser() user: User
  ): Promise<Posts> {
    console.log('user in controller: ',user);
    return this.postService.createPost(createPostDto, user);
  }

  @Get("/tag/:id")
  findTags(@Param("id") tag: string): Promise<Tag[]> {
    return this.postService.findTags(tag);
  }

  @Post("comment")
  @UseGuards(AuthGuard())
  comment(
    @Body() comment: CommentDto,
    @GetUser() user: User
  ): Promise<Comment> {
    return this.postService.comment(comment, user);
  }
  @Get("findAllPostWithTag/:tag")
  findAllPostWithTag(@Param() tag: string): Promise<Posts[]> {
    return this.postService.findAllPostWithTag(tag);
  }
}
