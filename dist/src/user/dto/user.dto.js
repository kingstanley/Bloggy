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
const class_validator_1 = require("class-validator");
class UserDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MaxLength(20),
    class_validator_1.MinLength(3),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UserDto.prototype, "username", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MaxLength(30),
    class_validator_1.MinLength(5),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UserDto.prototype, "email", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MaxLength(40),
    class_validator_1.MinLength(8),
    class_validator_1.IsNotEmpty(),
    class_validator_1.Matches(/((?=.*\d)|(?=.*\w+))(?![.\n])(?=.*[A-Z])(?=.[a-z]).*$/, { message: "Password must contain at least 1 upper case letter, 1 lower case letter and 1 number or 1 special character" }),
    __metadata("design:type", String)
], UserDto.prototype, "password", void 0);
__decorate([
    class_validator_1.MinLength(2),
    class_validator_1.MaxLength(30),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UserDto.prototype, "firstName", void 0);
__decorate([
    class_validator_1.MinLength(2),
    class_validator_1.MaxLength(100),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UserDto.prototype, "otherNames", void 0);
exports.UserDto = UserDto;
//# sourceMappingURL=user.dto.js.map