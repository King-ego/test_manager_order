import {Body, Controller, Post} from '@nestjs/common';
import {CreateOrderDto} from "../dto/create-order.dto";
import {CreateOrdersService} from "../services/create-orders/create-orders.service";

@Controller('orders')
export class OrdersController {
    constructor(
        private readonly createOrderService: CreateOrdersService
    ) {
    }
    @Post("/")
    public async createOrder(@Body() createOrderDto: CreateOrderDto) {
        const {
            document,
            userId,
            products
        } = createOrderDto;
        await this.createOrderService.execute({
            document,
            userId,
            products
        });
    }
}
