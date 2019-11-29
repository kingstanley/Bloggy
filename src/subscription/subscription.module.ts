import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionRepository } from './subscription.repository';

@Module({
  providers: [SubscriptionService],
  controllers: [SubscriptionController],
  imports: [
    TypeOrmModule.forFeature([SubscriptionRepository]),

  ],
})
export class SubscriptionModule {

}
