import {CreateProductDto} from "../../products/dto/create-product.dto";
import {IsArray, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID} from "class-validator";

export class CreateOrderDto {
    @IsNotEmpty()
    @IsUUID()
    @IsString()
    user_id: string;

    @IsOptional()
    @IsString()
    document_number: string;

    @IsNotEmpty({ each: true })
    @IsArray()
    products: CreateProductDto[];
}

class CreateProductOrderDto {
    @IsNotEmpty()
    @IsUUID()
    @IsString()
    product_id: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    quantity: number;
}