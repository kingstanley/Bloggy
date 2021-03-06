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
const notification_service_1 = require("../notification/notification/notification.service");
const get_user_decorator_1 = require("../user/get-user.decorator");
const comment_dto_1 = require("./dto/comment.dto");
const passport_1 = require("@nestjs/passport");
const user_entity_1 = require("../user/user.entity");
const post_dto_1 = require("./dto/post.dto");
const post_service_1 = require("./post.service");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
let PostApiController = class PostApiController {
    constructor(postService, notification) {
        this.postService = postService;
        this.notification = notification;
    }
    test() {
        console.log("mail route");
        return this.notification.newPostNotify();
    }
    findAll() {
        return this.postService.findAll();
    }
    allTags() {
        console.log("reaching all tags");
        return this.postService.allTags();
    }
    findById(id) {
        return this.postService.findById(id);
    }
    findByTitle(title) {
        return this.postService.findByTitle(title);
    }
    findByAuthor(authorId) {
        return this.postService.findByAuthor(authorId);
    }
    my(user) {
        return this.postService.my(user);
    }
    search(searchText) {
        return this.postService.findAll(searchText["id"]);
    }
    uploadFile(files) {
    }
    createPost(createPostDto, user) {
        console.log('user in controller: ', user);
        return this.postService.createPost(createPostDto, user);
    }
    findTags(tag) {
        return this.postService.findTags(tag);
    }
    comment(comment, user) {
        return this.postService.comment(comment, user);
    }
    findAllPostWithTag(tag) {
        return this.postService.findAllPostWithTag(tag);
    }
};
__decorate([
    common_1.Get("send-mail"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PostApiController.prototype, "test", null);
__decorate([
    common_1.Get("all"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PostApiController.prototype, "findAll", null);
__decorate([
    common_1.Get("tags"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostApiController.prototype, "allTags", null);
__decorate([
    common_1.Get(":id"),
    __param(0, common_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostApiController.prototype, "findById", null);
__decorate([
    common_1.Get("/findbytitle/:id"),
    __param(0, common_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostApiController.prototype, "findByTitle", null);
__decorate([
    common_1.Get("findbyauthor/:id"),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostApiController.prototype, "findByAuthor", null);
__decorate([
    common_1.Post("my"),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], PostApiController.prototype, "my", null);
__decorate([
    common_1.Get("search/:id"),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostApiController.prototype, "search", null);
__decorate([
    common_1.Post("upload"),
    common_1.UseInterceptors(platform_express_1.AnyFilesInterceptor()),
    __param(0, common_1.UploadedFiles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostApiController.prototype, "uploadFile", null);
__decorate([
    common_1.Post("save"),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Body()),
    __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_dto_1.PostDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], PostApiController.prototype, "createPost", null);
__decorate([
    common_1.Get("/tag/:id"),
    __param(0, common_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostApiController.prototype, "findTags", null);
__decorate([
    common_1.Post("comment"),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Body()),
    __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comment_dto_1.CommentDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], PostApiController.prototype, "comment", null);
__decorate([
    common_1.Get("findAllPostWithTag/:tag"),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostApiController.prototype, "findAllPostWithTag", null);
PostApiController = __decorate([
    common_1.Controller("post"),
    __metadata("design:paramtypes", [post_service_1.PostService,
        notification_service_1.NotificationService])
], PostApiController);
exports.PostApiController = PostApiController;
//# sourceMappingURL=post.api.controller.js.map