"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const notification_module_1 = require("./../notification/notification.module");
const post_repository_1 = require("./post.repository");
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const post_service_1 = require("./post.service");
const post_api_controller_1 = require("./post.api.controller");
const post_controller_1 = require("./post.controller");
let PostModule = class PostModule {
};
PostModule = __decorate([
    common_1.Module({
        controllers: [post_api_controller_1.PostApiController, post_controller_1.PostController],
        providers: [post_service_1.PostService],
        imports: [typeorm_1.TypeOrmModule.forFeature([post_repository_1.PostsRepository]), notification_module_1.NotificationModule],
        exports: [post_service_1.PostService]
    })
], PostModule);
exports.PostModule = PostModule;
//# sourceMappingURL=post.module.js.map