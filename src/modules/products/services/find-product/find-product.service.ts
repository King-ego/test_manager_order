import { Injectable } from '@nestjs/common';
import {ProductsRepository} from "../../repositories/product.repository";

@Injectable()
export class FindProductService {
    constructor(private readonly productRepository: ProductsRepository) {}

    public async execute(product_id: string){
        return  this.productRepository.getProduct(product_id);

    }
}
