import {Injectable, UnauthorizedException} from "@nestjs/common";
import {UsersService} from "../users/users.service";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signIn(email: string, pass: string): Promise<any> {
        const user = await this.usersService.login(email, pass);
        if (user === null) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.id, username: user.first_name, role: user.role };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}