import {Body, Controller} from '@nestjs/common';
import {CreateOrderDto} from "../dto/create-order.dto";

@Controller('orders')
export class OrdersController {
    public async createOrder(@Body() createOrderDto: CreateOrderDto) {
        console.log({ createOrderDto });
    }
}
