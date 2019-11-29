import { User } from "../user/user.entity";
import { Subscription } from "./subscription.entity";
import { SubscriptionService } from "./subscription.service";
export declare class SubscriptionController {
    private subService;
    constructor(subService: SubscriptionService);
    findAll(): Promise<Subscription[]>;
    findByUserId(user: User): Promise<Subscription>;
    subscribe(subscription: Subscription): Promise<string>;
}
