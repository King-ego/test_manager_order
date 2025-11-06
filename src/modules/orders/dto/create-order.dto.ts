import {IsArray, IsNotEmpty, IsOptional, IsString, IsUUID} from "class-validator";
import {CreateProductOrderDto} from "./create-product-order.dto";

export class CreateOrderDto {
    @IsNotEmpty()
    @IsUUID()
    @IsString()
    userId: string;

    @IsOptional()
    @IsString()
    document: string;

    @IsNotEmpty()
    @IsArray()
    products: CreateProductOrderDto[];
}

