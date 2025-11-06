import {HttpStatus, Injectable} from '@nestjs/common';
import {OrderRepository} from "../../repositories/order.repository";
import {ProductOrderRepository} from "../../repositories/product-order.repository";

import {Prisma, PrismaClient} from "../../../../../prisma/generated/mysql/client"
import {CreateOrderDto} from "../../dto/create-order.dto";
import {ProductsRepository} from "../../../products/repositories/product.repository";
import {CustomerException} from "../../../../shared/errors/customerException";
import {SystemLogs} from "../../../../shared/logsSystem/system.logs";
import {CreateProductOrderDto} from "../../dto/create-product-order.dto";

@Injectable()
export class CreateOrdersService {
    private readonly client: PrismaClient

    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly productOrderRepository: ProductOrderRepository,
        private readonly productRepository: ProductsRepository,
    ) {
        this.client = new PrismaClient();
    }

    public async execute(data_order: CreateOrderDto){
        await this.client.$transaction(async (client: Prisma.TransactionClient)=> {
            const promise: any[] = [];
            const order = await this.orderRepository.createOrder({
                userId: data_order.userId,
                document: data_order.document,
            }, client);

            const createProductOrder = async (product: CreateProductOrderDto) =>{
                const product_exists = await this.productRepository.getProduct(product.productId);

                if(!product_exists){
                    SystemLogs(`Product not found`);
                    throw new CustomerException("Product not found", HttpStatus.NOT_FOUND);
                }

                const available_quantity = product_exists.stock - product.quantity;

                if(available_quantity < 0){
                    SystemLogs(`Insufficient stock for product ID ${product_exists.name}`);
                    throw new CustomerException(`Insufficient stock for product ID ${product_exists.name}`, HttpStatus.BAD_REQUEST);
                }

                await this.productRepository.updateProduct(
                    product.productId,
                    { stock: available_quantity},
                    client
                );

                await this.productOrderRepository.createProductOrder({
                    order: {connect: {id: order.id}},
                    productId: product.productId,
                    quantity: product.quantity,
                }, client);
            }

            data_order.products.map(product=>promise.push(createProductOrder(product)));

            await Promise.all(promise);
            return "Order created successfully";
        })
    }

}
