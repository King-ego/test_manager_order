import { IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID} from "class-validator";

export class CreateProductOrderDto {
    @IsNotEmpty()
    @IsUUID()
    @IsString()
    productId: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    quantity: number;
}