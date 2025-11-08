import {IsNotEmpty, IsString} from "class-validator";

export class CreateOrderService {
    @IsNotEmpty()
    @IsString()
    status: "CANCELED" | "CONCLUDE";
}