import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import {CreateUserDto} from "../dto/create-user.dto";
import {User} from "../../../../prisma/generated/mysql/client";

@Injectable()
export class CreateUserService {
    private userRepository: UsersRepository;

    constructor() {
        this.userRepository = new UsersRepository();
    }

    public async execute(date_user: CreateUserDto): Promise<User> {
        return this.userRepository.createUser(date_user);

    }
}
