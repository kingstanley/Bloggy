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
const post_entity_1 = require("./post.entity");
const typeorm_1 = require("typeorm");
let Tag = class Tag extends basemodel_1.BaseModel {
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Tag.prototype, "tag", void 0);
__decorate([
    typeorm_1.ManyToMany(type => post_entity_1.Posts, post => post.tags),
    __metadata("design:type", Array)
], Tag.prototype, "posts", void 0);
Tag = __decorate([
    typeorm_1.Entity()
], Tag);
exports.Tag = Tag;
//# sourceMappingURL=tag.entity.js.map