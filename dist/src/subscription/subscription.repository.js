"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const subscription_entity_1 = require("./subscription.entity");
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
let SubscriptionRepository = class SubscriptionRepository extends typeorm_1.Repository {
    async findAll() {
        return await this.find();
    }
    async findByUserId(user) {
        return await this.findOne({ email: user.email });
    }
    async subscribe(subscription) {
        try {
            const sub = new subscription_entity_1.Subscription();
            sub.email = subscription.email;
            let tags = "";
            for (const tag of subscription.tags) {
                tags = tags + tag["tag"] + ",";
            }
            let exists = await this.findOne({ email: subscription.email });
            if (exists) {
                exists.tags = tags;
                await exists.save();
                return "Your subscription has been updated";
            }
            else {
                sub.tags = tags;
                console.log("Tag: ", tags);
                await sub.save();
                return "Your subscription is successful!";
            }
        }
        catch (ex) {
            console.log("Error: ", ex);
            throw new common_1.InternalServerErrorException("Can't save your subscription now! Try Again ");
        }
    }
};
SubscriptionRepository = __decorate([
    typeorm_1.EntityRepository(subscription_entity_1.Subscription)
], SubscriptionRepository);
exports.SubscriptionRepository = SubscriptionRepository;
//# sourceMappingURL=subscription.repository.js.map