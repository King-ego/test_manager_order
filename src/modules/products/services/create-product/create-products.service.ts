import { Injectable } from '@nestjs/common';
import {CreateProductDto} from "../../dto/create-product.dto";
import {ProductsRepository} from "../../repositories/product.repository";

@Injectable()
export class CreateProductsService {
    constructor(
        private readonly productRepository: ProductsRepository,
    ) {
    }
    public async execute(product: CreateProductDto) {
        return this.productRepository.createProduct(product);
    }
}
