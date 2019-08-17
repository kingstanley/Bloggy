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
  async SignUp(userDto: import('./dto/user.dto').UserDto): Promise<{message:string}> {
    try {
      const salt = await bcrypt.genSalt();
      userDto.password = await this.hashPassword(userDto.password, salt);
      userDto['salt'] = salt;
      const usernameExist = await this.findOne({ username: userDto.username });
      if (usernameExist) {
        throw new ConflictException(
          'Username already exist. Choose another username and try again'
        );
      }

      const userEmailExist = await this.findOne({ email: userDto.email });
      if (userEmailExist) {
        throw new ConflictException(
          'Email already exist. Choose another email  and try again'
        );
      }
      const user = await User.create(userDto).save();
      if (user) {
        return {message:'Sign up successful'};
      }  
    } catch (error) {
      console.log('Error: ', error.message);

      throw new InternalServerErrorException(error.message);
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
      const user = await User.findOne({ username }) || await this.findOne({email:username});
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
