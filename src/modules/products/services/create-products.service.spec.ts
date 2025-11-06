import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductsService } from './create-products.service';

describe('CreateProductsService', () => {
  let service: CreateProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateProductsService],
    }).compile();

    service = module.get<CreateProductsService>(CreateProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
