import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { CreateProductsService } from './services/create-product/create-products.service';
import { ProductsRepository } from './repositories/product.repository';
import { FindProductService } from './services/find-product/find-product.service';
import { DeleteProductService } from './services/delete-product/delete-product.service';
import { ListProductService } from './services/list-product/list-product.service';

@Module({
  controllers: [ProductsController],
  providers: [CreateProductsService, ProductsRepository, FindProductService, DeleteProductService, ListProductService],
  exports: [ProductsRepository],
})
export class ProductsModule {}
