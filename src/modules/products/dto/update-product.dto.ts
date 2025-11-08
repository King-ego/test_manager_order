import {IsNumber, IsOptional, IsString, Min} from "class-validator";

export class UpdateProductDto {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsNumber()
    @Min(1)
    stock: number;

    @IsOptional()
    @IsNumber()
    @Min(0.01)
    price: number;
}