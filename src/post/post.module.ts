import { NotificationModule } from './../notification/notification.module';
import { PostsRepository } from './post.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common'; 
import { PostService } from './post.service';
import { UserModule } from './../user/user.module';
import { PostApiController } from './post.api.controller';
import { PostController } from './post.controller';
 

@Module({
  controllers: [PostApiController, PostController],
  providers: [PostService],
  imports: [TypeOrmModule.forFeature([PostsRepository]), NotificationModule]
  ,exports:[PostService]
})
export class PostModule {}
