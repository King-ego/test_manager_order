import { Injectable } from '@nestjs/common';
import {PrismaClient, Prisma, Order} from "../../../../prisma/generated/mysql/client";

@Injectable()
export class OrderRepository {
    private readonly client: PrismaClient;

    constructor() {
        this.client = new PrismaClient();
    }

    public async createOrder(data: Prisma.OrderCreateInput, prisma?: Prisma.TransactionClient): Promise<Order> {
        const orm = prisma ?? this.client;
        return orm.order.create({ data });
    }

}
