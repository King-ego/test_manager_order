import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "../services/login/auth.service";
import {CreateLoginDto} from "../dto/create-login.dto";

@Controller('session')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {
    }

    @Post('/')
    public async login(@Body() body: CreateLoginDto) {
        const { email, password } = body;
        return this.authService.execute({ email, password });
    }
}
