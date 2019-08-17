"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const tag_entity_1 = require("./entity/tag.entity");
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const post_entity_1 = require("./entity/post.entity");
let PostsRepository = class PostsRepository extends typeorm_1.Repository {
    async findByTitle(title) {
        const found = await this.findOne({ where: { title } });
        if (!found) {
            throw new common_1.NotFoundException(`Could not found Posts with Title: ${title}`);
        }
        return found;
    }
    async findById(id) {
        const query = this.createQueryBuilder('post');
        const found = query.whereInIds(id).getOne();
        if (!found) {
            throw new common_1.NotFoundException(`Could not found Posts with the specifield id`);
        }
        return found;
    }
    async findAllByAuthorId(authorId) {
        const query = this.createQueryBuilder('post');
        const found = query.where({ userId: authorId }).getMany();
        if (found) {
            return found;
        }
        else {
            throw new common_1.NotFoundException('The author currently have any published new');
        }
    }
    async createPosts(postDto, user) {
        const { tags, title, content, allowComments, status } = postDto;
        try {
            console.log('dto: ', postDto);
            const slug = title.replace(/ /g, '-');
            console.log('Tags: ', tags);
            const post = await post_entity_1.Posts.create({
                title,
                content,
                slug,
                allowComments,
                status,
                user,
            });
            const tagsToSave = [];
            console.log('Tag length: ', tags.length);
            for (let i = 0; i < tags.length; i++) {
                let tagg = await tag_entity_1.Tag.findOne({ tag: tags[i].tag });
                console.log('found tag :', tagg);
                if (!tagg) {
                    tagg = await tag_entity_1.Tag.create(tags[i]).save();
                    tagsToSave.push(tagg);
                }
                else {
                    tagsToSave.push(tagg);
                }
            }
            post.tags = tagsToSave;
            post.user = user;
            await post.save();
            return post;
        }
        catch (error) {
            console.log(error.message);
            throw new common_1.InternalServerErrorException('Sorry, We could not save your Posts. Try Again: ' + error.message);
        }
    }
};
PostsRepository = __decorate([
    typeorm_1.EntityRepository(post_entity_1.Posts)
], PostsRepository);
exports.PostsRepository = PostsRepository;
//# sourceMappingURL=post.repository.js.map