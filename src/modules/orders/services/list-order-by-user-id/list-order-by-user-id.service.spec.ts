import { Test, TestingModule } from '@nestjs/testing';
import { ListOrderByUserIdService } from './list-order-by-user-id.service';

describe('ListOrderByUserIdService', () => {
  let service: ListOrderByUserIdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListOrderByUserIdService],
    }).compile();

    service = module.get<ListOrderByUserIdService>(ListOrderByUserIdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
