import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/roles/roles.entity';
import { RolesService } from 'src/roles/roles.service';
import { AssociationsService } from 'src/associations/associations.service';

@Injectable()
export class UsersService {
    constructor(
            @InjectRepository(User)
            private repository: Repository<User>,
            @InjectRepository(Role) 
            private rolesRepository: Repository<Role>,
            @Inject(forwardRef(() => RolesService))
            private rolesServ : RolesService,
            private assoServ : AssociationsService
        ) {}
    async create(firstname : string, lastname : string, age:number, password:string): Promise<User>{
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
        return await this.repository.find({relations: ['roles']});
    }
    async getById(id): Promise<User>{
        return await this.repository.findOne({where: {id: Equal(id)}, relations: ['roles']});
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
        if (firstname !== undefined && firstname!==""){
            u.firstname = firstname;
        }
        if (lastname !== undefined && lastname!==""){
            u.lastname = lastname;
        }
        if (age !== undefined){
            u.age = age;
        }
        if (password !== undefined && password!==""){
            const saltOrRounds = 10;
            const hash = await bcrypt.hash(password, saltOrRounds);
            u.password = hash;
        }
        return await this.repository.save(u);
    }
    async delete(id:number): Promise<User>{
        const u = await this.repository.findOne({where: {id: Equal(id)}});
        const roles = await this.getAllRolesById(id);
        for(let i:number = 0 ; i<roles.length;i++){
            await this.rolesServ.delete(id, roles[i].idAssociation);
            if (roles[i].name==='Président'){
                await this.assoServ.delete(roles[i].idAssociation)
            }
        }
        if(!u){
            return undefined; 
        }
        await this.repository.delete(id);
        return u;
    }
}
