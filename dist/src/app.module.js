"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_module_1 = require("./user/user.module");
const post_module_1 = require("./post/post.module");
const typeormconfig_1 = require("../config/typeormconfig");
const email_config_1 = require("../config/email.config");
const tutorial_module_1 = require("./tutorial/tutorial.module");
const platform_express_1 = require("@nestjs/platform-express");
const notification_module_1 = require("./notification/notification.module");
const subscription_module_1 = require("./subscription/subscription.module");
const mailer_1 = require("@nest-modules/mailer");
const app_controller_1 = require("./app/app.controller");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(typeormconfig_1.typeOrmConfig),
            user_module_1.UserModule,
            post_module_1.PostModule,
            tutorial_module_1.TutorialModule,
            platform_express_1.MulterModule.register({
                dest: "./upload"
            }),
            mailer_1.MailerModule.forRoot({
                transport: `smtps://${email_config_1.email.address}:${email_config_1.email.password}@${email_config_1.email.server}`,
                defaults: {
                    from: '"nest-modules" <modules@nestjs.com>'
                },
                template: {
                    dir: __dirname + "/templates",
                    adapter: new mailer_1.HandlebarsAdapter(),
                    options: {
                        strict: true
                    }
                }
            }),
            notification_module_1.NotificationModule,
            subscription_module_1.SubscriptionModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [],
        exports: [user_module_1.UserModule, post_module_1.PostModule]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map