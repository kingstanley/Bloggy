import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator'; 

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  signup(@Body() userDto: UserDto): Promise<string> {
    return this.userService.SignuP(userDto);
  }

  @Post('signin')
  signin(
    @Body() authCredentialDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.userService.SignIn(authCredentialDto);
  }
@Post('login')
login(@Body() authCredentialDto: AuthCredentialsDto): Promise<{accessToken: string}>{
  return this.userService.SignIn(authCredentialDto);
}

  @Get()
  @UseGuards(AuthGuard())
  findAll(@GetUser() user:User): Promise<User[]> {
    console.log('user in all user route: ', user)
    return this.userService.findAll();
  }
}
