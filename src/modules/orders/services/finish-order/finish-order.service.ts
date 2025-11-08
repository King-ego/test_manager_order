import { Injectable } from '@nestjs/common';
import {CustomerException} from "../../../../shared/errors/customerException";
import {SystemLogs} from "../../../../shared/logsSystem/system.logs";
import {OrderRepository} from "../../repositories/order.repository";
import {PrismaClient, ProductOrder, Prisma} from "../../../../../prisma/generated/mysql/client";
import {ProductsRepository} from "../../../products/repositories/product.repository";

interface IFinishOrderProps {
    status: "CANCELED" | "FINISHED"
    order_id: string;
}

@Injectable()
export class FinishOrderService {
    private readonly client: PrismaClient;

    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly productRepository: ProductsRepository,
    ) {
        this.client = new PrismaClient();
    }

    public async execute(data_order: IFinishOrderProps) {
        const run = {
            CANCELED: async (order_id: string) => this.cancelOrder(order_id),
            FINISHED: async (order_id: string) => this.finishOrder(order_id)
        }

        const action = run[data_order.status];

        if(!action){
            SystemLogs("Status inválide");
            throw new CustomerException("Status inválido CANCELED/FINISHED", 400);
        }

        await action(data_order.order_id)
    }

    private async cancelOrder(order_id: string) {
        const order = await this.orderRepository.getOrderById(order_id)

        if(!order){
            SystemLogs("Order not found");
            throw new CustomerException("Order not found", 404);
        }

        if(order.status !== "PENDING") {
            SystemLogs("Only pending orders can be canceled");
            throw new CustomerException("Only pending orders can be canceled", 400);
        }

        await this.client.$transaction(async (transaction: Prisma.TransactionClient) => {
            const promise: any[] = [];
            const updatedStockProduct = async (productOrder: ProductOrder) => {
                const product = await this.productRepository.getProduct(productOrder.productId)

                if(!product) {
                    SystemLogs(`Product not found for ID ${productOrder.productId}`);
                    throw new CustomerException(`Product not found for ID ${productOrder.productId}`, 404);
                }

                const stock = productOrder.quantity + product.stock;

                await this.productRepository.updateProduct(productOrder.productId, {stock}, transaction);
            }

            order.productsOrder.map((pto: ProductOrder) => promise.push(updatedStockProduct(pto)));

            await this.orderRepository.updateOrder(order.id, {status: "CANCELED"}, transaction);

            await Promise.all(promise);
        })


    }

    private async finishOrder(order_id: string) {
        const order = await this.orderRepository.getOrderById(order_id)

        if(!order){
            SystemLogs("Order not found");
            throw new CustomerException("Order not found", 404);
        }

        if(order.status !== "PENDING") {
            SystemLogs("Only pending orders can be finished");
            throw new CustomerException("Only pending orders can be finished", 400);
        }

        await this.orderRepository.updateOrder(order.id, {status: "FINISHED"})
    }
}
