import { Injectable } from '@nestjs/common';
import {ProductsRepository} from "../../repositories/product.repository";

@Injectable()
export class DeleteProductService {
    constructor(private readonly productRepository: ProductsRepository) {}

    public async execute(product_id: string): Promise<void>  {
        await this.productRepository.deleteProduct(product_id);
    }
}
