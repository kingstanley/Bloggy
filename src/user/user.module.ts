import { PostModule } from './../post/post.module';
import { SessionSerializer } from './session.serializer';
import { secret } from './../../config/keys';
import { LocalStrategy } from './passport.local';
import { NotificationModule } from './../notification/notification.module';
import { JwtStrategy } from './jwt.strategy';
import { Module } from '@nestjs/common';
import { UserApiController } from './user.api.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { PassportModule } from '@nestjs/passport';
import { UploadController } from './upload.controller';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController, UserApiController, UploadController],

  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.register({
      secret,
      signOptions: { expiresIn: 100000 },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    NotificationModule, PostModule,
  ],
  providers: [UserService, JwtStrategy, LocalStrategy, SessionSerializer],
  exports: [JwtStrategy, PassportModule],
})
export class UserModule {}
