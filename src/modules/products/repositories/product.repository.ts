import { Injectable } from '@nestjs/common';
import {Product, Prisma, PrismaClient} from "../../../../prisma/generated/mysql/client";

@Injectable()
export class ProductsRepository {
    private readonly client: PrismaClient;

    constructor() {
        this.client = new PrismaClient();
    }

    public async createProduct(data: Prisma.ProductCreateInput, prisma?: Prisma.TransactionClient): Promise<Product> {
        const prismaOrm = prisma ?? this.client;
        return prismaOrm.product.create({ data });
    }

    public async getProduct(id: string): Promise<Product | null> {
        return this.client.product.findUnique({ where: { id } });
    }

    public async getProducts(): Promise<Product[]> {
        return this.client.product.findMany();
    }

    public async deleteProduct(id: string, prisma?: Prisma.TransactionClient): Promise<void> {
        const prismaOrm = prisma ?? this.client;
        await prismaOrm.product.delete({ where: { id } });
    }
}


