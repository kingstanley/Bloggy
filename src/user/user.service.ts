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
    private jwtService: JwtService,
  ) {}
  async SignuP(userDto: UserDto): Promise<string> {
    return await this.userRepository.SignUp(userDto);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }
  async SignIn(
    authCredentialDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
  // console.log(authCredentialDto)
  const username = await this.userRepository.validateUserPassword(
    authCredentialDto,
  ); 
  if (!username) {
    throw new UnauthorizedException('Invalid Credentials');
  }
  const payload: JwtPayload = { username };
  const accessToken = this.jwtService.sign(payload);
  return { accessToken };
  }

  // async SignIn(
  //   authCredentialDto: AuthCredentialsDto,
  // ): Promise<{ accessToken: string }> {
  //   return { accessToken: 'The route seem ok now' };
  // }
}
