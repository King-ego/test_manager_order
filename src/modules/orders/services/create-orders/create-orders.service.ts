import {HttpStatus, Injectable} from '@nestjs/common';
import {OrderRepository} from "../../repositories/order.repository";
import {ProductOrderRepository} from "../../repositories/product-order.repository";

import {Prisma, PrismaClient} from "../../../../../prisma/generated/mysql/client"
import {CreateOrderDto} from "../../dto/create-order.dto";
import {ProductsRepository} from "../../../products/repositories/product.repository";
import {CustomerException} from "../../../../shared/errors/customerException";
import {SystemLogs} from "../../../../shared/logsSystem/system.logs";
import {CreateProductOrderDto} from "../../dto/create-product-order.dto";
import {UsersRepository} from "../../../users/repositories/users.repository";

@Injectable()
export class CreateOrdersService {
    private readonly client: PrismaClient

    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly productOrderRepository: ProductOrderRepository,
        private readonly productRepository: ProductsRepository,
        private readonly userRepository: UsersRepository
    ) {
        this.client = new PrismaClient();
    }

    public async execute(data_order: CreateOrderDto) {
        const cleaned_document = this.clearDocument(data_order.document);

        const method = cleaned_document.length === 11 ? 9 : 6;

        const document_exists = await fetch(`https://api.cpfcnpj.com.br/${process.env.TOKEN_API_DOCUMENT}/${method}/${cleaned_document}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        });

        const response_data = await document_exists.json();

        if (!response_data.status) {
            SystemLogs(`Invalid document`);
            throw new CustomerException("Invalid document", HttpStatus.BAD_REQUEST);
        }

        await this.client.$transaction(async (transaction: Prisma.TransactionClient) => {
            const user_exists = await this.userRepository.getById(data_order.userId);
            if (!user_exists) {
                SystemLogs(`User not found`);
                throw new CustomerException("User not found", HttpStatus.NOT_FOUND);
            }
            const promise: any[] = [];

            const order = await this.orderRepository.createOrder({
                user: {connect: {id: data_order.userId}},
                document: cleaned_document,
            }, transaction);

            const createProductOrder = async (product: CreateProductOrderDto) => {
                const product_exists = await this.productRepository.getProduct(product.productId);

                if (!product_exists) {
                    SystemLogs(`Product not found`);
                    throw new CustomerException("Product not found", HttpStatus.NOT_FOUND);
                }

                const available_quantity = product_exists.stock - product.quantity;

                if (available_quantity < 0) {
                    SystemLogs(`Insufficient stock for product ID ${product_exists.name}`);
                    throw new CustomerException(`Insufficient stock for product ID ${product_exists.name}`, HttpStatus.BAD_REQUEST);
                }

                await this.productRepository.updateProduct(
                    product.productId,
                    {stock: available_quantity},
                    transaction
                );

                await this.productOrderRepository.createProductOrder({
                    order: {connect: {id: order.id}},
                    product: {connect: {id: product.productId}},
                    quantity: product.quantity,
                }, transaction);
            }

            data_order.products.map(product => promise.push(createProductOrder(product)));

            await Promise.all(promise);
            return "Order created successfully";
        })
    }

    private clearDocument(document: string): string {
        if (!document) return '';
        return String(document).replace(/\D/g, '');
    }

}
