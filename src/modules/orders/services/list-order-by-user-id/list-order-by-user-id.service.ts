import { Injectable } from '@nestjs/common';
import {OrderRepository} from "../../repositories/order.repository";
import {SystemLogs} from "../../../../shared/logsSystem/system.logs";
import {CustomerException} from "../../../../shared/errors/customerException";

@Injectable()
export class ListOrderByUserIdService {
    constructor(
        private readonly orderRepository: OrderRepository
    ) {
    }
    public async execute(user_id: string, auth_id: string) {
        console.log({user_id, auth_id})
        if (user_id !== auth_id) {
            SystemLogs("User trying to access orders of another user")
            throw new CustomerException("Access denied to orders of another user", 403);
        }

        return this.orderRepository.listOrderByUserId(user_id);
    }
}
