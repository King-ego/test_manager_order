import { Injectable } from '@nestjs/common';
import {OrderRepository} from "../../repositories/order.repository";

@Injectable()
export class ListOrderByUserIdService {
    constructor(
        private readonly orderRepository: OrderRepository
    ) {
    }
    public async execute(user_id: string) {
        return this.orderRepository.listOrderByUserId(user_id);
    }
}
