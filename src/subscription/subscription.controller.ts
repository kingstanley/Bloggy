import { User } from "../user/user.entity";
import { Subscription } from "./subscription.entity";
import { SubscriptionService } from "./subscription.service";
import { Controller, Get, Body, Post } from "@nestjs/common";
import { GetUser } from "../user/get-user.decorator";


@Controller("subscription")
export class SubscriptionController {
  constructor(private subService: SubscriptionService) {}

  @Get()
  findAll(): Promise<Subscription[]> {
    return this.subService.findAll();
  }

  @Get("findbyuser")
  findByUserId(@GetUser() user: User): Promise<Subscription> {
    return this.subService.findByUserId(user);
  }

  @Post()
  subscribe(@Body() subscription: Subscription): Promise<string> {
    const sub =  this.subService.subscribe(subscription);
    return;
  }

}
