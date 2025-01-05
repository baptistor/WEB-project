import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/roles/roles.entity';

@Injectable()
export class UsersService {
    constructor(
            @InjectRepository(User)
            private repository: Repository<User>,
            @InjectRepository(Role) 
            private rolesRepository: Repository<Role>
        ) {}
    async create(lastname : string, firstname : string, age:number, password:string): Promise<User>{
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);
        const newUser = await this.repository.create({
            lastname: firstname, 
            firstname: lastname, 
            age: age,
            password: hash
        });
        return await this.repository.save(newUser);
    }
    async getAll(): Promise<User[]>{
        return await this.repository.find();
    }
    async getById(id): Promise<User>{
        return await this.repository.findOne({where: {id: Equal(id)}});
    }
    async getAllRolesById(paramId: number): Promise<Role[]> {
        const id = +paramId;
        return await this.rolesRepository.find({ where: { idUser: paramId } });

    }
    async update(id : number, lastname : string, firstname : string, age : number,password: string): Promise<User>{
        const u = await this.repository.findOne({where: {id: Equal(id)}});
        if (!u){
            return undefined;
        }
        if (firstname !== undefined ){
            u.firstname = firstname;
        }
        if (lastname !== undefined ){
            u.lastname = lastname;
        }
        if (age !== undefined){
            u.age = age;
        }
        if (password !== undefined){
            const saltOrRounds = 10;
            const hash = await bcrypt.hash(password, saltOrRounds);
            u.password = hash;
        }
        return await this.repository.save(u);
    }
    async delete(id:number): Promise<User>{
        const u = await this.repository.findOne({where: {id: Equal(id)}});
        if(!u){
            return undefined; 
        }
        await this.repository.delete(id);
        return u;
    }
}
