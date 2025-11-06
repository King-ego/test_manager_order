import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { CreateProductsService } from './services/create-products.service';
import { ProductsRepository } from './repositories/product.repository';

@Module({
  controllers: [ProductsController],
  providers: [CreateProductsService, ProductsRepository],
  exports: [ProductsRepository],
})
export class ProductsModule {}
