import {Body, Controller, Post} from '@nestjs/common';
import {CreateProductDto} from "../dto/create-product.dto";
import {CreateProductsService} from "../services/create-product/create-products.service";
import {Product} from "../../../../prisma/generated/mysql/client";

@Controller('products')
export class ProductsController {
    constructor(
        private readonly createProductService: CreateProductsService,
    ) {}

    @Post("/")
    public async createProduct(@Body() body: CreateProductDto): Promise<Product> {
        const { name, price, stock } = body;

        return this.createProductService.execute({ name, price, stock });
    }
}
