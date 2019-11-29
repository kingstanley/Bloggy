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
const user_entity_1 = require("../user/user.entity");
const subscription_entity_1 = require("./subscription.entity");
const subscription_service_1 = require("./subscription.service");
const common_1 = require("@nestjs/common");
const get_user_decorator_1 = require("../user/get-user.decorator");
let SubscriptionController = class SubscriptionController {
    constructor(subService) {
        this.subService = subService;
    }
    findAll() {
        return this.subService.findAll();
    }
    findByUserId(user) {
        return this.subService.findByUserId(user);
    }
    subscribe(subscription) {
        return this.subService.subscribe(subscription);
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "findAll", null);
__decorate([
    common_1.Get("findbyuser"),
    __param(0, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "findByUserId", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [subscription_entity_1.Subscription]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "subscribe", null);
SubscriptionController = __decorate([
    common_1.Controller("subscription"),
    __metadata("design:paramtypes", [subscription_service_1.SubscriptionService])
], SubscriptionController);
exports.SubscriptionController = SubscriptionController;
//# sourceMappingURL=subscription.controller.js.map