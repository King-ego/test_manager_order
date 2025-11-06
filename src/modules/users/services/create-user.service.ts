import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import {CreateUserDto} from "../dto/create-user.dto";

@Injectable()
export class CreateUserService {

    constructor(private readonly userRepository: UsersRepository) {}

    public async execute(date_user: CreateUserDto) {
        return this.userRepository.createUser(date_user);
        /*this.client.$transaction(async (prisma: Prisma.TransactionClient)=> {*/
        /*})*/
    }
}
