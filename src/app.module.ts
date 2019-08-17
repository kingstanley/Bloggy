import { Module } from '@nestjs/common'; 
import {TypeOrmModule} from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module'; 
import { typeOrmConfig } from '../config/typeormconfig';
import { TutorialModule } from './tutorial/tutorial.module';

@Module({
   imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    PostModule,
    TutorialModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
