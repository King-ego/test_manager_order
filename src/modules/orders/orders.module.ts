import { Module } from '@nestjs/common';
import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';
import { OrderRepository } from './repositories/order.repository';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, OrderRepository],
  exports: [OrderRepository],
})
export class OrdersModule {}
