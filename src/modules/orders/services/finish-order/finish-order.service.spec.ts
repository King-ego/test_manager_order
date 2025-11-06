import { Test, TestingModule } from '@nestjs/testing';
import { FinishOrderService } from './finish-order.service';

describe('FinishOrderService', () => {
  let service: FinishOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FinishOrderService],
    }).compile();

    service = module.get<FinishOrderService>(FinishOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
