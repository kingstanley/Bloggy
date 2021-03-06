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
const about_dto_1 = require("./dto/about.dto");
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_entity_1 = require("./user.entity");
const user_dto_1 = require("./dto/user.dto");
const auth_credentials_dto_1 = require("./dto/auth-credentials.dto");
const passport_1 = require("@nestjs/passport");
const get_user_decorator_1 = require("./get-user.decorator");
let UserApiController = class UserApiController {
    constructor(userService) {
        this.userService = userService;
        this.SERVER_URL = process.env.SERVER || 'http://localhost:3000/';
    }
    signup(userDto) {
        return this.userService.SignuP(userDto);
    }
    signin(authCredentialDto) {
        return this.userService.SignIn(authCredentialDto);
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
            console.log("Body not found");
            throw new common_1.BadRequestException('Sorry, You must select a file to upload!');
        }
    }
    about(about, user) {
        return this.userService.about(user, about);
    }
};
__decorate([
    common_1.Post('signup'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], UserApiController.prototype, "signup", null);
__decorate([
    common_1.Post('signin'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_credentials_dto_1.AuthCredentialsDto]),
    __metadata("design:returntype", Promise)
], UserApiController.prototype, "signin", null);
__decorate([
    common_1.Get(),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UserApiController.prototype, "findAll", null);
__decorate([
    common_1.Post('upload'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, get_user_decorator_1.GetUser()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Object]),
    __metadata("design:returntype", void 0)
], UserApiController.prototype, "uploadFile", null);
__decorate([
    common_1.Post('about'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Body()), __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [about_dto_1.AboutDto, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], UserApiController.prototype, "about", null);
UserApiController = __decorate([
    common_1.Controller('api/user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserApiController);
exports.UserApiController = UserApiController;
//# sourceMappingURL=user.api.controller.js.map