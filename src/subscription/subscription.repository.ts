import { Subscription } from "./subscription.entity";
import { Repository, EntityRepository } from "typeorm";
import { User } from "src/user/user.entity";
import { InternalServerErrorException } from "@nestjs/common";

@EntityRepository(Subscription)
export class SubscriptionRepository extends Repository<Subscription> {
  // Find All Subscriptions
  async findAll(): Promise<Subscription[]> {
    return await this.find();
  }

  // Find A logged in user subscription
  async findByUserId(user: User): Promise<Subscription> {
    return await this.findOne({ email: user.email });
  }

  // Create Subscription
  async subscribe(subscription: Subscription): Promise<string> {
    try {
      const sub = new Subscription();
      sub.email = subscription.email;
      let tags = "";
      for (const tag of subscription.tags) {
        tags = tags + tag["tag"] + ",";
      }
      let exists = await this.findOne({ email: subscription.email });
      if (exists) {
        // console.log("Already subscribed!");
        exists.tags =tags;
       await exists.save();
        return "Your subscription has been updated";
      } else {
        
        sub.tags = tags;
        console.log("Tag: ", tags);

        await sub.save();
        return "Your subscription is successful!";
      }
    } catch (ex) {
      console.log("Error: ", ex);
      throw new InternalServerErrorException(
        "Can't save your subscription now! Try Again "
      );
    }
  }
}
