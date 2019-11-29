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
const notification_service_1 = require("./../notification/notification/notification.service");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_repository_1 = require("./user.repository");
const jwt_1 = require("@nestjs/jwt");
let UserService = class UserService {
    constructor(userRepository, notification, jwtService) {
        this.userRepository = userRepository;
        this.notification = notification;
        this.jwtService = jwtService;
    }
    async SignuP(userDto) {
        const user = await this.userRepository.SignUp(userDto);
        const verify = await this.notification.signUpSuccess(user.email, user.token);
        if (verify.length > 0) {
            console.log("Email sent");
            return { message: 'Your account has been successfully created. Please check your email to verify your account' };
        }
        return { message: "Your account was successfully created" };
    }
    async findAll() {
        return await this.userRepository.find();
    }
    async SignInLocal(authCredentials) {
        return await this.userRepository.validateUserPassword(authCredentials);
    }
    async SignIn(authCredentialDto) {
        const user = await this.userRepository.validateUserPassword(authCredentialDto);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid Credentials');
        }
        const payload = { username: user.username, email: user.email, avatar: user.avatar };
        const accessToken = this.jwtService.sign(payload);
        return { accessToken };
    }
    async about(user, aboutDto) {
        return this.userRepository.about(user, aboutDto);
    }
    async setAvatar(user, avatar) {
        return await this.userRepository.setAvatar(user, avatar);
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_repository_1.UserRepository)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        notification_service_1.NotificationService,
        jwt_1.JwtService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map