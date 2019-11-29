import { User } from "./../user/user.entity";
import { SubscriptionRepository } from "./subscription.repository";
import { Subscription } from "./subscription.entity";
import { Injectable, Controller } from "@nestjs/common";

@Injectable()
export class SubscriptionService {
  constructor(private subscriptionRepo: SubscriptionRepository) {}
  // Find All Subscription
  async findAll(): Promise<Subscription[]> {
    return await this.subscriptionRepo.findAll();
  }

  async findByUserId(user: User): Promise<Subscription> {
    return await this.subscriptionRepo.findByUserId(user);
  }

  async subscribe(subscription: Subscription): Promise<string>{
      return await this.subscriptionRepo.subscribe(subscription);
  }
}
