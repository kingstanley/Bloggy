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
const post_entity_1 = require("./post.entity");
const user_entity_1 = require("./../../user/user.entity");
const typeorm_1 = require("typeorm");
const basemodel_1 = require("../../basemodel");
let Comment = class Comment extends basemodel_1.BaseModel {
};
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Comment.prototype, "content", void 0);
__decorate([
    typeorm_1.Column('uuid'),
    __metadata("design:type", String)
], Comment.prototype, "postId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Comment.prototype, "status", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.User, user => user.comments, { eager: false }),
    __metadata("design:type", user_entity_1.User)
], Comment.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne(type => post_entity_1.Posts, posts => posts.comments, { eager: false }),
    __metadata("design:type", post_entity_1.Posts)
], Comment.prototype, "post", void 0);
Comment = __decorate([
    typeorm_1.Entity()
], Comment);
exports.Comment = Comment;
//# sourceMappingURL=comment.entity.js.map