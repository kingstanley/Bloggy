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
const authenticated_guard_1 = require("./../common/guards/authenticated.guard");
const common_1 = require("@nestjs/common");
const post_service_1 = require("./post.service");
const common_2 = require("@nestjs/common");
const comment_dto_1 = require("./dto/comment.dto");
const get_user_decorator_1 = require("../user/get-user.decorator");
const user_entity_1 = require("../user/user.entity");
let PostController = class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    async index() {
        return { posts: await this.postService.findAll(), tags: await this.postService.allTags() };
    }
    async findByTagr(id) {
        return { posts: await this.postService.findAllPostWithTag(id), tags: await this.postService.allTags() };
    }
    async findByAuthor(id) {
        return { posts: await this.postService.findByAuthor(id), tags: await this.postService.allTags() };
    }
    async view(id) {
        return { post: await this.postService.findById(id), tags: await this.postService.allTags() };
    }
    async comment(id, comment, user, res) {
        comment.postId = id;
        console.log("Comment: ", comment);
        const comt = await this.postService.comment(comment, user);
        console.log("Comment Saved: ", comt);
        res.redirect(`/posts/view/${comt.postId}`);
    }
};
__decorate([
    common_1.Get(),
    common_2.Render('posts/list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostController.prototype, "index", null);
__decorate([
    common_1.Get('tag/:id'),
    common_2.Render('posts/list'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "findByTagr", null);
__decorate([
    common_1.Get('author/:id'),
    common_2.Render('posts/list'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "findByAuthor", null);
__decorate([
    common_1.Get('view/:id'),
    common_2.Render('posts/view'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "view", null);
__decorate([
    common_1.Post('comment/:id'),
    common_1.UseGuards(authenticated_guard_1.AuthenticatedGuard),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __param(2, get_user_decorator_1.GetUser()),
    __param(3, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, comment_dto_1.CommentDto,
        user_entity_1.User, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "comment", null);
PostController = __decorate([
    common_2.Controller('posts'),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
exports.PostController = PostController;
//# sourceMappingURL=post.controller.js.map