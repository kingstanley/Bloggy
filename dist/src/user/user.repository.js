"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const fs = require("fs");
let UserRepository = class UserRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.SERVER_URL = process.env.SERVER || 'http://localhost:3000/';
    }
    async SignUp(userDto) {
        try {
            const salt = await bcrypt.genSalt();
            userDto.password = await this.hashPassword(userDto.password, salt);
            userDto.salt = salt;
            const usernameExist = await this.findOne({ username: userDto.username });
            if (usernameExist) {
                throw new common_1.ConflictException('Username already exist. Choose another username and try again');
            }
            const userEmailExist = await this.findOne({ email: userDto.email });
            if (userEmailExist) {
                throw new common_1.ConflictException('Email already exist. Choose another email  and try again');
            }
            userDto.token = Array(20)
                .fill(null)
                .map(() => Math.round(Math.random() * 16).toString(16))
                .join('');
            userDto.tokenExpiresAt = Date.now() * 60 * 60 * 24;
            const user = await user_entity_1.User.create(userDto).save();
            if (user) {
                return user;
            }
        }
        catch (error) {
            console.log('Error: ', error.message);
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async hashPassword(password, salt) {
        return await bcrypt.hash(password, salt);
    }
    async validateUserPassword(authCredentialDto) {
        try {
            const { username, password } = authCredentialDto;
            const user = (await user_entity_1.User.findOne({ username })) ||
                (await this.findOne({ email: username }));
            if (user && (await user.validatePassword(password))) {
                delete user.password;
                delete user.salt;
                return user;
            }
            else {
                return null;
            }
        }
        catch (error) {
            console.log('Error: ', error);
            throw new common_1.InternalServerErrorException('Error: ', error);
        }
    }
    async about(user, aboutDto) {
        user.about = aboutDto.about;
        await user.save();
        return aboutDto;
    }
    async setAvatar(user, avatar) {
        try {
            const randomName = Array(32)
                .fill(null)
                .map(() => Math.round(Math.random() * 16).toString(16))
                .join('');
            const path = this.SERVER_URL + 'upload/' + randomName + '.jpg';
            let { file, filename } = avatar;
            file = file.split(',')[1];
            fs.writeFile('upload/' + randomName + '.jpg', file, 'base64', err => {
                if (err) {
                }
            });
            if (user.avatar) {
                const p = user.avatar.split(`${this.SERVER_URL}`)[1];
                fs.unlink(p, err => {
                    if (err) {
                        console.log('Error removing file :', err);
                    }
                });
            }
            user.avatar = path;
            await user.save();
            delete user.password;
            delete user.salt;
            return user;
        }
        catch (ex) {
            throw new common_1.BadRequestException('Sorry, you must select a file to upload');
        }
    }
};
UserRepository = __decorate([
    typeorm_1.EntityRepository(user_entity_1.User)
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map