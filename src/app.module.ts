import { Module } from '@nestjs/common'; 
import {TypeOrmModule} from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module'; 
import { typeOrmConfig } from '../config/typeormconfig';

@Module({
   imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
