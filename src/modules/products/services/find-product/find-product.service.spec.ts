import { Test, TestingModule } from '@nestjs/testing';
import { FindProductService } from './find-product.service';

describe('FindProductService', () => {
  let service: FindProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindProductService],
    }).compile();

    service = module.get<FindProductService>(FindProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
