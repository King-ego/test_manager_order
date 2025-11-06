import {Body, Controller, Post} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import {CreateUserService} from "../services/create-user/create-user.service";
import {User} from "../../../../prisma/generated/mysql/client";

@Controller('users')
export class UsersController {
    constructor(private readonly createUserService: CreateUserService) {}

    @Post("/")
    public async createUser(@Body() dataUser: CreateUserDto): Promise<User> {
        const { name, email, password } = dataUser;

        return this.createUserService.execute({ name, email, password });
    }
}
