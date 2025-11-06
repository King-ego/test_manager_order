import {IsNotEmpty, IsNumber, IsString, Min} from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    stock: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0.01)
    price: number;
}