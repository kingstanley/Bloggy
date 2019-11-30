"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const subscription_service_1 = require("./subscription.service");
const subscription_api_controller_1 = require("./subscription.api.controller");
const typeorm_1 = require("@nestjs/typeorm");
const subscription_repository_1 = require("./subscription.repository");
const subscription_controller_1 = require("./subscription.controller");
let SubscriptionModule = class SubscriptionModule {
};
SubscriptionModule = __decorate([
    common_1.Module({
        providers: [subscription_service_1.SubscriptionService],
        controllers: [subscription_controller_1.SubscriptionController, subscription_api_controller_1.SubscriptionApiController],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([subscription_repository_1.SubscriptionRepository]),
        ],
    })
], SubscriptionModule);
exports.SubscriptionModule = SubscriptionModule;
//# sourceMappingURL=subscription.module.js.map