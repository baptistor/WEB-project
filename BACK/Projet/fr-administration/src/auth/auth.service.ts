import { Injectable } from '@nestjs/common';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService} from '@nestjs/jwt';
// import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(private services: UsersService, private jwtService: JwtService){
    }
    public async validateUser(id: number, password: string) : Promise<User> {
        const user = await this.services.getById(id);
        // if ( await bcrypt.compare(password, user.password)){
        //     return user
        // }
        // else{
        //     return undefined
        // }
        if(user.password===password){
            return user
        }
        else{
            undefined
        }
    }

    async login(user: any) {
        const payload = { username: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
