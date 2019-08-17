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
let UserRepository = class UserRepository extends typeorm_1.Repository {
    async SignUp(userDto) {
        try {
            const salt = await bcrypt.genSalt();
            userDto.password = await this.hashPassword(userDto.password, salt);
            userDto['salt'] = salt;
            const usernameExist = await this.findOne({ username: userDto.username });
            if (usernameExist) {
                throw new common_1.ConflictException('Username already exist. Choose another username and try again');
            }
            const userEmailExist = await this.findOne({ email: userDto.email });
            if (userEmailExist) {
                throw new common_1.ConflictException('Email already exist. Choose another email  and try again');
            }
            const user = await user_entity_1.User.create(userDto).save();
            if (user) {
                return { message: 'Sign up successful' };
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
            console.log(authCredentialDto);
            const user = await user_entity_1.User.findOne({ username }) || await this.findOne({ email: username });
            console.log(user);
            if (user && (await user.validatePassword(password))) {
                return user.username;
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
};
UserRepository = __decorate([
    typeorm_1.EntityRepository(user_entity_1.User)
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map