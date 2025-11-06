import {Body, Controller, Get, Post, Param} from '@nestjs/common';
import {CreateOrderDto} from "../dto/create-order.dto";
import {CreateOrdersService} from "../services/create-orders/create-orders.service";
import {ListOrderByUserIdService} from "../services/list-order-by-user-id/list-order-by-user-id.service";
import {FinishOrderService} from "../services/finish-order/finish-order.service";
import {CreateOrderService} from "../dto/finish-order.dto";

@Controller('orders')
export class OrdersController {
    constructor(
        private readonly createOrderService: CreateOrdersService,
        private readonly listOrderByUserIdService: ListOrderByUserIdService,
        private readonly finishOrderService: FinishOrderService
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

    @Get("/user/:userId")
    public async getOrderByClientId(@Param("userId") userId: string) {
        return this.listOrderByUserIdService.execute(userId)
    }

    @Post("/finish/:orderId")
    public async finishOrder(@Param("orderId") orderId: string, @Body() body: CreateOrderService) {
        console.log(orderId, body);
        return this.finishOrderService.execute({
            order_id: orderId,
            status: body.status
        });
    }
}
