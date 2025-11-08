import { Module } from '@nestjs/common';
import {AuthController} from "./controllers/auth.controller";
import { AuthService } from './services/login/auth.service';
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {jwtConfig} from "../../config/auth";
import {UsersRepository} from "../users/repositories/users.repository";
import {JwtAuthGuard} from "./jwt-auth.guard";
import {JwtStrategy} from "./jwt.strategy";

@Module({
    imports: [
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.register({
            secret: jwtConfig.secret,
            signOptions: { expiresIn: jwtConfig.expiresIn },
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, UsersRepository, JwtStrategy, JwtAuthGuard],
    exports: [JwtStrategy, PassportModule],
})
export class AuthModule {

}
