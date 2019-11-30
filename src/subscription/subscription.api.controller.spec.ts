import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionApiController } from './subscription.api.controller';

describe('Subscription Controller', () => {
  let controller: SubscriptionApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubscriptionApiController],
    }).compile();

    controller = module.get<SubscriptionApiController>(SubscriptionApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
