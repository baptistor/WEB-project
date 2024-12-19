import { Injectable } from '@nestjs/common';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private services: UsersService){
    }
    public async validateUser(id: number, password: string) : Promise<User> {
        const user = await this.services.getById(id);
        if ( user.password === password){
            return user
        }
        else{
            return undefined
        }
    }
}
