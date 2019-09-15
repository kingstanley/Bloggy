"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const comment_entity_1 = require("./entity/comment.entity");
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
        try {
            const query = this.createQueryBuilder('post');
            const found = await this.findOne({
                where: { id },
                relations: ['user', 'likes', 'tags', 'comments'],
            });
            delete found.user.password;
            delete found.user.salt;
            const comments = [];
            for (const u of found.comments) {
                delete u.user.salt;
                delete u.user.password;
                comments.push(u);
            }
            found.comments = comments.sort((createdAt, commentId) => -1);
            if (!found) {
                throw new common_1.NotFoundException(`Could not found Posts with the specifield id`);
            }
            return found;
        }
        catch (ex) {
            throw new common_1.InternalServerErrorException(ex.message);
        }
    }
    async findAllByAuthorId(authorId) {
        const query = this.createQueryBuilder('post');
        const found = await this.find({ where: { userId: authorId }, relations: ['user', 'likes', 'tags'] });
        console.log('Posts by author: ', found.length);
        if (found) {
            return found;
        }
        else {
            throw new common_1.NotFoundException('The author currently have any published post');
        }
    }
    async my(user) {
        try {
            const posts = await this.find({ userId: user.id });
            return posts;
        }
        catch (ex) {
            console.log('Error: ', ex);
            throw new common_1.InternalServerErrorException(ex.message);
        }
    }
    async comment(commentDto, user) {
        console.log('comment dto: ', commentDto);
        const post = await this.findById(commentDto.postId);
        console.log('post found: ', post);
        if (!post) {
            throw new common_1.NotFoundException('The specifield post does not exist!');
        }
        const comment = await comment_entity_1.Comment.create({
            postId: commentDto.postId,
            content: commentDto.comment,
            user,
        }).save();
        if (!comment) {
            throw new common_1.InternalServerErrorException('Sorry, We could not save your comment. Try Again');
        }
        console.log('Comments: ', comment);
        return comment;
    }
    async findAll() {
        try {
            const query = typeorm_1.createQueryBuilder(post_entity_1.Posts);
            const posts = await this.find({
                relations: ['user', 'likes', 'tags'],
            });
            for (let i = 0; i < posts.length; i++) {
                delete posts[i].user.password;
                delete posts[i].user.salt;
                delete posts[i].user.comments;
            }
            return posts;
        }
        catch (error) {
            console.log('Error: ', error);
            throw new common_1.InternalServerErrorException('Error:', error);
        }
    }
    async createPosts(postDto, user) {
        const { tags, title, content, allowComments, status, id, videoUrl, } = postDto;
        try {
            console.log('dto: ', postDto);
            const slug = title.replace(/ /g, '-');
            const query = typeorm_1.createQueryBuilder();
            const oldTags = await query.connection.query(`Delete  FROM post_tags_tag WHERE postId = '${id}'`);
            console.log('Old tags: ', oldTags);
            const tagsToSave = [];
            for (let i = 0; i < tags.length; i++) {
                let tagg = await tag_entity_1.Tag.findOne({ tag: tags[i].tag });
                if (!tagg) {
                    tagg = await tag_entity_1.Tag.create(tags[i]).save();
                    tagsToSave.push(tagg);
                }
                else {
                    tagsToSave.push(tagg);
                }
            }
            let post = await this.findById(id);
            if (!post) {
                post = new post_entity_1.Posts();
            }
            console.log('Tag to save: ', tagsToSave);
            post.title = title;
            post.allowComments = allowComments;
            post.slug = slug;
            post.status = status;
            post.content = content;
            post.videoUrl = videoUrl;
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
    async allTags() {
        try {
            const query = typeorm_1.createQueryBuilder(tag_entity_1.Tag);
            const tags = await query.getMany();
            console.log('Tags: ', tags);
            return tags;
        }
        catch (ex) {
            console.log('Error: ', ex);
            throw new common_1.InternalServerErrorException('Error loading tags');
        }
    }
    async findTags(tag) {
        const query = typeorm_1.createQueryBuilder(tag_entity_1.Tag);
        const tags = await query
            .where('tag.tag like :tag', { tag: '%' + tag + '%' })
            .getMany();
        return tags;
    }
};
PostsRepository = __decorate([
    typeorm_1.EntityRepository(post_entity_1.Posts)
], PostsRepository);
exports.PostsRepository = PostsRepository;
//# sourceMappingURL=post.repository.js.map