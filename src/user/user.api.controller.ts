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
  Param,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { extname } from 'path';

@Controller('api/user')
export class UserApiController {
  SERVER_URL: string = process.env.SERVER || 'http://localhost:3000/';
  constructor(private userService: UserService) {}

  @Post('signup')
  signup(@Body() userDto: UserDto): Promise<{ message: string }> {
    // console.log(userDto)
    return this.userService.SignuP(userDto);
  }

  @Post('signin')
  signin(
    @Body() authCredentialDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.userService.SignIn(authCredentialDto);
  }

  // @Post('login')
  // login(@Body() authCredentialDto: AuthCredentialsDto): Promise<{accessToken: string}>{
  //   return this.userService.SignIn(authCredentialDto);
  // }

  @Get()
  @UseGuards(AuthGuard())
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
     
    if(body){ 
      return this.userService.setAvatar(user, body);
    }
    else{
      console.log("Body not found")
      throw new BadRequestException('Sorry, You must select a file to upload!')
    }

  }

  @Post('about')
  @UseGuards(AuthGuard())
  about(@Body() about: AboutDto, @GetUser() user: User) {
    return this.userService.about(user, about);
  }
}
