import { Injectable } from '@nestjs/common';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
    @InjectRepository(User) 
    private repository: Repository<User>,
     private jwtService: JwtService){}
    public async validateUser(id: number, password: string) : Promise<User> {
        const user = await this.repository.createQueryBuilder('user').addSelect('user.password').where('user.id = :id', { id }).getOne();
            const hash = user.password;
        if(await bcrypt.compare(password, hash)){
            return user
        }
        return null
    }
    async login(user: any) {
        const payload = { username: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
