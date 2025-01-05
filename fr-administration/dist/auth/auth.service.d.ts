import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private services;
    private jwtService;
    constructor(services: UsersService, jwtService: JwtService);
    validateUser(id: number, password: string): Promise<User>;
    login(user: any): Promise<{
        access_token: string;
    }>;
}
