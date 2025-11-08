import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    async login(user: { email: string, password?: string }) {
        /*const payload = { sub: user.id, email: user.email };
        return {
            access_token: this.jwtService.sign(payload),
        };*/
    }

    verify(token: string) {
        return this.jwtService.verify(token);
    }
}
