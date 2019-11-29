import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { PostModule } from "./post/post.module";
import { typeOrmConfig } from "../config/typeormconfig";
import { email } from "../config/email.config";
import { TutorialModule } from "./tutorial/tutorial.module";
import { MulterModule } from "@nestjs/platform-express";
import { NotificationModule } from "./notification/notification.module";
import { SubscriptionModule } from "./subscription/subscription.module";
import { HandlebarsAdapter, MailerModule } from "@nest-modules/mailer";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { AppController } from './app/app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    PostModule,
    TutorialModule,
    MulterModule.register({
      dest: "./upload"
    }),
    MailerModule.forRoot({
      transport: `smtps://${email.address}:${
        email.password
      }@${email.server}`,
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>'
      },
      template: {
        dir: __dirname + "/templates",
        adapter: new HandlebarsAdapter(), // or new PugAdapter()
        options: {
          strict: true
        }
      }
    }),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, "..", "angular")
    // }),
    NotificationModule,
    SubscriptionModule
  ],
  controllers: [AppController],
  providers: [],
  exports:[UserModule,PostModule]
})
export class AppModule {}
