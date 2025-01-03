import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/roles/roles.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private repository: Repository<User>,
        @InjectRepository(Role) 
        private rolesRepository: Repository<Role>
    ){}

    async getAll(): Promise<User[]> {
        return this.repository.find();
    }

    async getById(paramId: number): Promise<User> {
        const id = +paramId;
        return await this.repository.findOneBy({id});

    }

    async getAllRolesById(paramId: number): Promise<Role[]> {
        const id = +paramId;
        return await this.rolesRepository.find({ where: { idUser: paramId } });

    }

    async create(name: string, firstname: string, age: number, password: string): Promise<User> {
        if (firstname !== undefined && name !== undefined && age !== undefined) {
            const user = this.repository.create({name, firstname, age, password})
            return await this.repository.save(user);
        }
        return null


    }
    async update(name: string, firstname: string, age: number,paramId: number): Promise<User> {
        const user = await this.repository.findOne({ where: { id: paramId } });

        if (firstname !== undefined && name !== undefined && age !== undefined) {

    
            user.name = name;
            user.firstname = firstname;
            user.age = age;
    
            const updatedUser = await this.repository.save(user);
    
            return updatedUser;
        }
    
        throw new HttpException(
            `Manque un ou plusieurs paramètres pour mettre à jour le User qui a comme ID : ${paramId}/ mauvais pwd`,
            HttpStatus.BAD_REQUEST,
        );
    }


    async delete(paramId: number): Promise<Boolean>{
        const id = +paramId;
        const delUser=await this.repository.delete(id);
        return delUser.affected>0;
    }
}
