"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = require("@nestjs/passport");
const user_entity_1 = require("./../user/user.entity");
const post_dto_1 = require("./dto/post.dto");
const post_service_1 = require("./post.service");
const common_1 = require("@nestjs/common");
const get_user_decorator_1 = require("../user/get-user.decorator");
let PostController = class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    findById(id) {
        return this.postService.findById(id);
    }
    findByTitle(title) {
        return this.postService.findByTitle(title);
    }
    findAll() {
        return this.postService.findAll();
    }
    createPost(createPostDto, user) {
        return this.postService.createPost(createPostDto, user);
    }
};
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "findById", null);
__decorate([
    common_1.Get('/findbytitle/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "findByTitle", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostController.prototype, "findAll", null);
__decorate([
    common_1.Post(),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Body()),
    __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_dto_1.PostDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "createPost", null);
PostController = __decorate([
    common_1.Controller('post'),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
exports.PostController = PostController;
//# sourceMappingURL=post.controller.js.map