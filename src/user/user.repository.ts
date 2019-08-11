import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async SignUp(userDto: import('./dto/user.dto').UserDto): Promise<string> {
    try {
      const salt = await bcrypt.genSalt();
      userDto.password = await this.hashPassword(userDto.password, salt);
      userDto['salt'] = salt;
      const user = await User.create(userDto).save();
      if (user) {
        return 'Sign up successful';
      } else {
        return 'Sign up failed!';
      }
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(error.detail);
      } else {
        throw new InternalServerErrorException(`Sign up failed. Try Again!`);
      }
    }
  }

  async hashPassword(password: string, salt: string) {
    return await bcrypt.hash(password, salt);
  }
  async validateUserPassword(
    authCredentialDto: AuthCredentialsDto,
  ): Promise<string> {
    try {
      const { username, password } = authCredentialDto;
      console.log(authCredentialDto);
      const user = await User.findOne({ username });
      console.log(user);
      if (user && (await user.validatePassword(password))) {
        return user.username;
      } else {
        return null;
      }
    } catch (error) {
      console.log('Error: ', error);
      throw new InternalServerErrorException('Error: ', error);
    }
  }
}
