import { email } from './../../config/email.config';
import { MailerService } from '@nest-modules/mailer';
import { NotificationService } from './../notification/notification/notification.service';
import { AboutDto } from './dto/about.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import {
  ConflictException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import fs = require('fs');

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  mailer: MailerService;
  SERVER_URL: string = process.env.SERVER || 'http://localhost:3000/';
  async SignUp(
    userDto: import('./dto/user.dto').UserDto,
  ): Promise<User> {
    try {
      const salt = await bcrypt.genSalt();
      userDto.password = await this.hashPassword(userDto.password, salt);
      userDto.salt = salt;
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
      userDto.token = Array(20)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      userDto.tokenExpiresAt = Date.now() * 60 * 60 * 24;

      const user = await User.create(userDto).save();

      if (user) {
        
      return   user;
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
  ): Promise<User> {
    try {
      const { username, password } = authCredentialDto;
      // console.log(authCredentialDto);
      const user =
        (await User.findOne({ username })) ||
        (await this.findOne({ email: username }));
      // console.log(user);
      if (user && (await user.validatePassword(password))) {
        delete user.password;
        delete user.salt;
        return user;
      } else {
        return null;
      }
    } catch (error) {
      console.log('Error: ', error);
      throw new InternalServerErrorException('Error: ', error);
    }
  }

  async about(user: User, aboutDto: AboutDto): Promise<AboutDto> {
    user.about = aboutDto.about;
    await user.save();
    return aboutDto;
  }
  async setAvatar(user: User, avatar: any) {
    try {
      const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      const path = this.SERVER_URL + 'upload/' + randomName + '.jpg';
      let { file, filename } = avatar;
      file = file.split(',')[1];

      fs.writeFile('upload/' + randomName + '.jpg', file, 'base64', err => {
        if (err) {
          // console.log('Error writting file: ', err);
        }
      });

      // check if the user already have a profile image and delete it
      if (user.avatar) {
        const p = user.avatar.split(`${this.SERVER_URL}`)[1];
        // console.log('P: ', p);
        fs.unlink(p, err => {
          if (err) {
            console.log('Error removing file :', err);
          }
        });
      }
      user.avatar = path;
      await user.save();
      delete user.password;
      delete user.salt;
      return user;
    } catch (ex) {
      throw new BadRequestException('Sorry, you must select a file to upload');
    }
  }
}
