import {Body, Controller, Get, Post, Param, Delete, UseGuards} from '@nestjs/common';
import {CreateProductDto} from "../dto/create-product.dto";
import {CreateProductsService} from "../services/create-product/create-products.service";
import {Product} from "../../../../prisma/generated/mysql/client";
import {FindProductService} from "../services/find-product/find-product.service";
import {DeleteProductService} from "../services/delete-product/delete-product.service";
import {ListProductService} from "../services/list-product/list-product.service";
import {JwtAuthGuard} from "../../auth/jwt-auth.guard";

@Controller('products')
export class ProductsController {
    constructor(
        private readonly createProductService: CreateProductsService,
        private readonly findProductService: FindProductService,
        private readonly deleteProductService: DeleteProductService,
        private readonly listProductService: ListProductService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post("/")
    public async createProduct(@Body() body: CreateProductDto): Promise<Product> {
        const { name, price, stock } = body;

        return this.createProductService.execute({ name, price, stock });
    }

    @UseGuards(JwtAuthGuard)
    @Get("/:productId")
    public async findProduct(@Param("productId") productId: string): Promise<Product | null> {
        return this.findProductService.execute(productId);
    }

    @UseGuards(JwtAuthGuard)
    @Get("/")
    public async listProducts(): Promise<Product[]> {
        return this.listProductService.execute();
    }

    @UseGuards(JwtAuthGuard)
    @Delete("/:productId")
    public async deleteProduct(@Param("productId") productId: string): Promise<string> {
        await this.deleteProductService.execute(productId);

        return "Product deleted successfully";
    }
}
