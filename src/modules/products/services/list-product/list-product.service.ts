import { Injectable } from '@nestjs/common';
import {ProductsRepository} from "../../repositories/product.repository";

@Injectable()
export class ListProductService {
    constructor(
        private readonly productRepository: ProductsRepository,
    ) {}

    public async execute() {
        return this.productRepository.getProducts();
    }
}
