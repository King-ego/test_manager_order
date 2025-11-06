import {Injectable} from "@nestjs/common";
import {PrismaClient, Prisma} from "../../../../prisma/generated/mysql/client";

@Injectable()
export class ProductOrderRepository{
    private readonly client: PrismaClient;

    constructor() {
        this.client = new PrismaClient();
    }

    public async createProductOrder(data: Prisma.ProductOrderCreateInput, prisma?: Prisma.TransactionClient): Promise<any>{
        const orm = prisma ?? this.client;
        return orm.productOrder.create({ data });
    }
}