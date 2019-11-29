import { NotificationService } from './../notification/notification/notification.service';
import { AboutDto } from './dto/about.dto';
import { Injectable, Get, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private notification: NotificationService,
    private jwtService: JwtService,
  ) {}
  async SignuP(userDto: UserDto): Promise<{message: string}> {
  const user = await this.userRepository.SignUp(userDto);
  const verify = await this.notification.signUpSuccess(user.email, user.token);
  if (verify.length > 0) {
    console.log("Email sent");
    return {message: 'Your account has been successfully created. Please check your email to verify your account'};
  }
  return{message: "Your account was successfully created"}
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }
 async SignInLocal(authCredentials: AuthCredentialsDto): Promise<User>{
 return await this.userRepository.validateUserPassword(authCredentials);
  }
  async SignIn(
    authCredentialDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
  // console.log(authCredentialDto)
  const user = await this.userRepository.validateUserPassword(
    authCredentialDto,
  );
  if (!user) {
    throw new UnauthorizedException('Invalid Credentials');
  }
  const payload: JwtPayload = { username: user.username, email: user.email, avatar: user.avatar };
  const accessToken = this.jwtService.sign(payload);
  return { accessToken };
  }

  async about(user: User, aboutDto: AboutDto): Promise<AboutDto> {
    return this.userRepository.about(user, aboutDto);
  }
 async setAvatar(user: User, avatar: any) {
  return await  this.userRepository.setAvatar(user, avatar);

  }
}
