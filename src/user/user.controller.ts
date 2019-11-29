import { PostService } from './../post/post.service';

import { AuthenticatedGuard } from './../common/guards/authenticated.guard';
import { LoginGuard } from './../common/guards/login.guard';
import { AboutDto } from './dto/about.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Req,
  Res,
  Param,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  BadRequestException,
  Render,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { extname } from 'path';
import { Response, Request } from 'express';

@Controller('user')
export class UserController {
  SERVER_URL: string = process.env.SERVER || 'http://localhost:3000/';
  constructor(private userService: UserService, private postService: PostService) {}

  @Post('create')
  @Render('account/create')
  async signup(
    @Body() userDto: UserDto,
    @Res() res,
  ): Promise<{ message: string }> {
      console.log('User object: ', userDto);
      if (userDto.password.toLowerCase() != userDto.password2.toLowerCase()) {
        return {message: 'Password and confirm password does not match!'};
    }
      const response = await this.userService.SignuP(userDto);
      if (response.message.includes('successful')) {
      return res.redirect('/posts');
    } else {
      return response;
    }
  }
  @Get('signin')
  @Render('account/signin')
  login(@Res() res) {
    return;
  }

  @Get('create')
  @Render('account/create')
  create(@Res() res) {
    return;
  }
  @Post('signin')
  @UseGuards(LoginGuard)
//   @Render('account/signin')
   signin(@Res() res: Response,
            //    @Body() authCredentialDto: AuthCredentialsDto,
  ) {
    // const user = await this.userService.SignInLocal(authCredentialDto);
    // console.log("user found: ", user);
    // if (user) {
         res.redirect('/posts');
    // }
  }

  // @Post('login')
  // login(@Body() authCredentialDto: AuthCredentialsDto): Promise<{accessToken: string}>{
  //   return this.userService.SignIn(authCredentialDto);
  // }

  @Get()
  @UseGuards( AuthenticatedGuard)
  findAll(@GetUser() user: User): Promise<User[]> {
    console.log('user in all user route: ', user);
    return this.userService.findAll();
  }

  @Post('upload')
  // @UseInterceptors(
  //   FileInterceptor("file", {
  //     storage: diskStorage({
  //       destination: "./upload",
  //       filename: (req, avatar, cb) => {
  //         // console.log('Avatar: ', req);
  //         const randomName = Array(32)
  //           .fill(null)
  //           .map(() => Math.round(Math.random() * 16).toString(16))
  //           .join("");
  //         return cb(null, `${randomName}${extname(avatar.originalname)}`);
  //       }
  //     })
  //   })
  // )
  @UseGuards(AuthGuard())
  uploadFile(
    // @UploadedFile() avatar,
    @GetUser() user: User,
    @Body() body: any,
  ) {
    if (body) {
      return this.userService.setAvatar(user, body);
    } else {
      console.log('Body not found');
      throw new BadRequestException('Sorry, You must select a file to upload!');
    }
  }

  @Post('about')
  @UseGuards(AuthGuard())
  about(@Body() about: AboutDto, @GetUser() user: User) {
    return this.userService.about(user, about);
  }
  @Get('signout')
  signOut(@Req() req: Request, @Res()res: Response) {
      req.logout();
      res.redirect('/');
  }
  @Get('dashboard')
  @UseGuards(AuthenticatedGuard)
  @Render('index/dashboard')
  dashboard(@Req() req: Request, @Res()res: Response, @GetUser() user) {
      console.log('user: ', user);
      return {posts:  this.postService.findByAuthor(user.id)};
  }
}
