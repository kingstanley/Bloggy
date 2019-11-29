import { User } from "./../user/user.entity";
import { SubscriptionRepository } from "./subscription.repository";
import { Subscription } from "./subscription.entity";
export declare class SubscriptionService {
    private subscriptionRepo;
    constructor(subscriptionRepo: SubscriptionRepository);
    findAll(): Promise<Subscription[]>;
    findByUserId(user: User): Promise<Subscription>;
    subscribe(subscription: Subscription): Promise<string>;
}
