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
const like_entity_1 = require("./../post/entity/like.entity");
const typeorm_1 = require("typeorm");
const basemodel_1 = require("../basemodel");
const bcrypt = require("bcrypt");
const post_entity_1 = require("../post/entity/post.entity");
const comment_entity_1 = require("../post/entity/comment.entity");
let User = class User extends basemodel_1.BaseModel {
    async validatePassword(password) {
        const hashedPassword = await bcrypt.hash(password, this.salt);
        return this.password === hashedPassword;
    }
};
__decorate([
    typeorm_1.Column({ length: 50 }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    typeorm_1.Column({ length: 100 }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "salt", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "otherNames", void 0);
__decorate([
    typeorm_1.Column({ length: 500, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "about", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "token", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], User.prototype, "tokenExpiresAt", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "confirmedEmail", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "confirmedPhone", void 0);
__decorate([
    typeorm_1.OneToOne(type => like_entity_1.Like, like => like.user),
    __metadata("design:type", like_entity_1.Like)
], User.prototype, "like", void 0);
__decorate([
    typeorm_1.OneToMany(type => post_entity_1.Posts, post => post.user, { cascade: true, eager: false }),
    __metadata("design:type", Array)
], User.prototype, "myposts", void 0);
__decorate([
    typeorm_1.OneToMany(type => comment_entity_1.Comment, comments => comments.user, { eager: false }),
    __metadata("design:type", Array)
], User.prototype, "comments", void 0);
__decorate([
    typeorm_1.OneToMany(type => like_entity_1.Like, like => like.user),
    __metadata("design:type", Array)
], User.prototype, "likes", void 0);
User = __decorate([
    typeorm_1.Entity(),
    typeorm_1.Unique(["username", "email"])
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map