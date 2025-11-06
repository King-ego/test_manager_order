import {HttpStatus, Injectable} from '@nestjs/common';
import { UsersRepository } from '../../repositories/users.repository';
import {CreateUserDto} from "../../dto/create-user.dto";
import {CustomerException} from "../../../../shared/errors/customerException";
import {SystemLogs} from "../../../../shared/logs/system.logs";

@Injectable()
export class CreateUserService {

    constructor(private readonly userRepository: UsersRepository) {}

    public async execute(date_user: CreateUserDto) {
        const userAlreadyExists = await this.userRepository.getByCredential(date_user.email);

        if (userAlreadyExists) {
            SystemLogs("User Exists for this email")
            throw new CustomerException("User Not Found", HttpStatus.NOT_FOUND)
        }

        return this.userRepository.createUser(date_user);
    }
}
