import {Module} from '@nestjs/common';
import {OrdersController} from './controllers/orders.controller';
import {CreateOrdersService} from './services/create-orders/create-orders.service';
import {OrderRepository} from './repositories/order.repository';
import {ProductOrderRepository} from "./repositories/product-order.repository";
import {ProductsRepository} from "../products/repositories/product.repository";
import {ListOrderByUserIdService} from './services/list-order-by-user-id/list-order-by-user-id.service';
import {UsersRepository} from "../users/repositories/users.repository";
import { FinishOrderService } from './services/finish-order/finish-order.service';

@Module({
    controllers: [OrdersController],
    providers: [CreateOrdersService, OrderRepository, ProductOrderRepository, ProductsRepository, ListOrderByUserIdService, UsersRepository, FinishOrderService],
    exports: [OrderRepository, ProductOrderRepository],
})
export class OrdersModule {
}
