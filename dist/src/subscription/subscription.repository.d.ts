import { Subscription } from "./subscription.entity";
import { Repository } from "typeorm";
import { User } from "src/user/user.entity";
export declare class SubscriptionRepository extends Repository<Subscription> {
    findAll(): Promise<Subscription[]>;
    findByUserId(user: User): Promise<Subscription>;
    subscribe(subscription: Subscription): Promise<string>;
}
