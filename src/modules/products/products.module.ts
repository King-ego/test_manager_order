import { Module } from '@nestjs/common';
import { ProductsController } from './controller/products.controller';

@Module({
  controllers: [ProductsController]
})
export class ProductsModule {}
