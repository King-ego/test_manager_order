import { Module } from '@nestjs/common';
import {AuthController} from "./controllers/auth.controller";
import { AuthService } from './services/login/auth.service';
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {jwtConfig} from "../../config/auth";

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: jwtConfig.secret,
            signOptions: { expiresIn: jwtConfig.expiresIn },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {

}
