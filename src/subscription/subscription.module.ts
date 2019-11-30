import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionApiController } from './subscription.api.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionRepository } from './subscription.repository';
import { SubscriptionController } from './subscription.controller';

@Module({
  providers: [SubscriptionService],
  controllers: [SubscriptionController, SubscriptionApiController],
  imports: [
    TypeOrmModule.forFeature([SubscriptionRepository]),

  ],
})
export class SubscriptionModule {

}
