import { Module } from '@nestjs/common';
import { OrdersController } from './controllers/orders.controller';
import { CreateOrdersService } from './services/create-orders/create-orders.service';
import { OrderRepository } from './repositories/order.repository';
import { ProductOrderRepository } from "./repositories/product-order.repository";
import {ProductsRepository} from "../products/repositories/product.repository";

@Module({
  controllers: [OrdersController],
  providers: [CreateOrdersService, OrderRepository, ProductOrderRepository, ProductsRepository],
  exports: [OrderRepository, ProductOrderRepository],
})
export class OrdersModule {}
