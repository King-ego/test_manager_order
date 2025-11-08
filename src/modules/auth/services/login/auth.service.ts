import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {CreateLoginDto} from "../../dto/create-login.dto";
import {UsersRepository} from "../../../users/repositories/users.repository";
import {SystemLogs} from "../../../../shared/logsSystem/system.logs";
import {CustomerException} from "../../../../shared/errors/customerException";
import {AuthBcrypt} from "../../bcrypt";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersRepository: UsersRepository
    ) {}

    public async execute(credential: CreateLoginDto) {
        const { email, password } = credential;

        const user =  await this.usersRepository.getByCredential(email);

        if (!user) {
            SystemLogs("User Not Found for this email")
            throw new CustomerException("Credentials Invalid", 401);
        }

        const isPasswordValid = await AuthBcrypt.comparePassword(password, user.password);

        if (!isPasswordValid) {
            SystemLogs("Invalid Password Attempt")
            throw new CustomerException("Credentials Invalid", 401);
        }

        const payload = { sub: user.id, email: user.email };
        const token = this.jwtService.sign(payload);

        const { password: _, ...userWithoutPassword } = user;

        return { user: userWithoutPassword, token };
    }

}
