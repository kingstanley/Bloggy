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
Object.defineProperty(exports, "__esModule", { value: true });
const basemodel_1 = require("../../basemodel");
const comment_entity_1 = require("./comment.entity");
const user_entity_1 = require("./../../user/user.entity");
const typeorm_1 = require("typeorm");
const tag_entity_1 = require("./tag.entity");
const like_entity_1 = require("./like.entity");
let Posts = class Posts extends basemodel_1.BaseModel {
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Posts.prototype, "title", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Posts.prototype, "slug", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Posts.prototype, "status", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Posts.prototype, "allowComments", void 0);
__decorate([
    typeorm_1.Column('uuid'),
    __metadata("design:type", String)
], Posts.prototype, "userId", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Posts.prototype, "content", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.User, user => user.myposts),
    __metadata("design:type", user_entity_1.User)
], Posts.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToMany(type => tag_entity_1.Tag, { cascade: true }),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Posts.prototype, "tags", void 0);
__decorate([
    typeorm_1.OneToMany(type => comment_entity_1.Comment, comment => comment.postId),
    __metadata("design:type", Array)
], Posts.prototype, "comments", void 0);
__decorate([
    typeorm_1.OneToMany(type => like_entity_1.Like, like => like.post),
    __metadata("design:type", Array)
], Posts.prototype, "likes", void 0);
Posts = __decorate([
    typeorm_1.Entity('post')
], Posts);
exports.Posts = Posts;
//# sourceMappingURL=post.entity.js.map