import { Injectable } from '@nestjs/common';
import {ProductsRepository} from "../../repositories/product.repository";

interface IUpdateProductService {
    id: string;
    name?: string;
    price?: number;
    stock?: number;
}

@Injectable()
export class UpdateProductService {
    constructor(
        private readonly productRepository: ProductsRepository,
    ) {}

    public async execute({ name, price, stock, id }: IUpdateProductService): Promise<void> {
        return this.productRepository.updateProduct(id, { name, price, stock });
    }
}
