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
const post_service_1 = require("./../post/post.service");
const authenticated_guard_1 = require("./../common/guards/authenticated.guard");
const login_guard_1 = require("./../common/guards/login.guard");
const about_dto_1 = require("./dto/about.dto");
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_entity_1 = require("./user.entity");
const user_dto_1 = require("./dto/user.dto");
const passport_1 = require("@nestjs/passport");
const get_user_decorator_1 = require("./get-user.decorator");
let UserController = class UserController {
    constructor(userService, postService) {
        this.userService = userService;
        this.postService = postService;
        this.SERVER_URL = process.env.SERVER || 'http://localhost:3000/';
    }
    async signup(userDto, res) {
        console.log('User object: ', userDto);
        if (userDto.password.toLowerCase() != userDto.password2.toLowerCase()) {
            return { message: 'Password and confirm password does not match!' };
        }
        const response = await this.userService.SignuP(userDto);
        if (response.message.includes('successful')) {
            return res.redirect('/posts');
        }
        else {
            return response;
        }
    }
    login(res) {
        return;
    }
    create(res) {
        return;
    }
    signin(res) {
        res.redirect('/posts');
    }
    findAll(user) {
        console.log('user in all user route: ', user);
        return this.userService.findAll();
    }
    uploadFile(user, body) {
        if (body) {
            return this.userService.setAvatar(user, body);
        }
        else {
            console.log('Body not found');
            throw new common_1.BadRequestException('Sorry, You must select a file to upload!');
        }
    }
    about(about, user) {
        return this.userService.about(user, about);
    }
    signOut(req, res) {
        req.logout();
        res.redirect('/');
    }
    dashboard(req, res, user) {
        console.log('user: ', user);
        return { posts: this.postService.findByAuthor(user.id) };
    }
};
__decorate([
    common_1.Post('create'),
    common_1.Render('account/create'),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signup", null);
__decorate([
    common_1.Get('signin'),
    common_1.Render('account/signin'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "login", null);
__decorate([
    common_1.Get('create'),
    common_1.Render('account/create'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "create", null);
__decorate([
    common_1.Post('signin'),
    common_1.UseGuards(login_guard_1.LoginGuard),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "signin", null);
__decorate([
    common_1.Get(),
    common_1.UseGuards(authenticated_guard_1.AuthenticatedGuard),
    __param(0, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    common_1.Post('upload'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, get_user_decorator_1.GetUser()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "uploadFile", null);
__decorate([
    common_1.Post('about'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Body()), __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [about_dto_1.AboutDto, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "about", null);
__decorate([
    common_1.Get('signout'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "signOut", null);
__decorate([
    common_1.Get('dashboard'),
    common_1.UseGuards(authenticated_guard_1.AuthenticatedGuard),
    common_1.Render('index/dashboard'),
    __param(0, common_1.Req()), __param(1, common_1.Res()), __param(2, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "dashboard", null);
UserController = __decorate([
    common_1.Controller('user'),
    __metadata("design:paramtypes", [user_service_1.UserService, post_service_1.PostService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map