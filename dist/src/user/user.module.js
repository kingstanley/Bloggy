"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_module_1 = require("./../post/post.module");
const session_serializer_1 = require("./session.serializer");
const keys_1 = require("./../../config/keys");
const passport_local_1 = require("./passport.local");
const notification_module_1 = require("./../notification/notification.module");
const jwt_strategy_1 = require("./jwt.strategy");
const common_1 = require("@nestjs/common");
const user_api_controller_1 = require("./user.api.controller");
const user_service_1 = require("./user.service");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const user_repository_1 = require("./user.repository");
const passport_1 = require("@nestjs/passport");
const upload_controller_1 = require("./upload.controller");
const user_controller_1 = require("./user.controller");
let UserModule = class UserModule {
};
UserModule = __decorate([
    common_1.Module({
        controllers: [user_controller_1.UserController, user_api_controller_1.UserApiController, upload_controller_1.UploadController],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_repository_1.UserRepository]),
            jwt_1.JwtModule.register({
                secret: keys_1.secret,
                signOptions: { expiresIn: 100000 },
            }),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            notification_module_1.NotificationModule, post_module_1.PostModule,
        ],
        providers: [user_service_1.UserService, jwt_strategy_1.JwtStrategy, passport_local_1.LocalStrategy, session_serializer_1.SessionSerializer],
        exports: [jwt_strategy_1.JwtStrategy, passport_1.PassportModule],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map