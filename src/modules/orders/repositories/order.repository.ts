import {Injectable} from '@nestjs/common';
import {Order, Prisma, PrismaClient} from "../../../../prisma/generated/mysql/client";

@Injectable()
export class OrderRepository {
    private readonly client: PrismaClient;

    constructor() {
        this.client = new PrismaClient();
    }

    public async createOrder(data: Prisma.OrderCreateInput, prisma?: Prisma.TransactionClient): Promise<Order> {
        const orm = prisma ?? this.client;
        return orm.order.create({data});
    }

    public async listOrderByUserId(userId: string): Promise<Order[]> {
        return this.client.order.findMany({
            where: {userId}, include: {
                productsOrder: {
                    include: {
                        product: true
                    }
                }
            }
        });
    }

    public async getOrderById(id: string): Promise<Prisma.OrderGetPayload<{ include: { productsOrder: true } }> | null> {
        return this.client.order.findUnique({where: {id}, include: {productsOrder: true}})
    }

    public async updateOrder(id: string, data: Prisma.OrderUpdateInput, prisma?: Prisma.TransactionClient): Promise<Order> {
        const orm = prisma ?? this.client;
        return orm.order.update({where: {id}, data});
    }

}
