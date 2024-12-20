import { User } from "./users.entity";
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
    // private users: User[] = [
    //     { id: 0, lastname: 'Doe', firstname: 'John', age: 20},
    //     // { id: 1, lastname: 'El', firstname: 'John', age: 21},
    //     // { id: 2, lastname: 'Eldsds', firstname: 'John', age: 22},
    //     // { id: 3, lastname: 'Elfff', firstname: 'John', age: 23},
    //     // { id: 4, lastname: 'Elccc', firstname: 'John', age: 24},
    // ];
    constructor(
            @InjectRepository(User)
            private repository: Repository<User>
        ) {}

    async getAll(): Promise<User[]> {
        return this.repository.find();
    }

    async getById(paramId: number): Promise<User> {
        const id = +paramId;
        if (this.repository.findOneBy({id}) === undefined ) {
            throw new HttpException(`Could not find a user with the id ${paramId}`, HttpStatus.NOT_FOUND)        
        }
        else{
            return this.repository.findOneBy ({id}); 
        }
    }



    async create(lastname: string, firstname: string, age: number, pwd: string): Promise<User> {
        if (firstname !== undefined && lastname !== undefined && age !== undefined && pwd!== undefined) {
            const saltOrRounds = 10;
            const hash = await bcrypt.hash(pwd, saltOrRounds);
            const user = new User(lastname, firstname, age, hash);
            const savedUser = await this.repository.save(user);
            return savedUser; 
        }

        throw new HttpException(`Manque un ou plusieurs paramètres pour créer l'association`, HttpStatus.NOT_FOUND)  ;      

    }
    async update(lastname: string, firstname: string, age: number, password: string,paramId: number): Promise<User> {
        const user = await this.repository.findOne({ where: { id: paramId } });
            
        if (!user) {
            throw new HttpException(`Utilisateur avec l'ID ${paramId} introuvable`, HttpStatus.NOT_FOUND);
        }

        if (firstname !== undefined && lastname !== undefined && age !== undefined && await bcrypt.compare(password, user.password)) {

    
            user.lastname = lastname;
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

    async updatePwdById(paramId: number, oldPwd: string, newPwd: string): Promise<User>{
        const user = await this.repository.findOne({ where: { id: paramId } });
        if (!user) {
            throw new HttpException(`Utilisateur avec l'ID ${paramId} introuvable`, HttpStatus.NOT_FOUND);
        }

        if(await bcrypt.compare(oldPwd, user.password)){
            const saltOrRounds = 10;
            user.password = await bcrypt.hash(newPwd, saltOrRounds);
            const updatedUser = await this.repository.save(user);
            return updatedUser;
        }

        throw new HttpException(`Mot de passe de l'utilisateur ${paramId} est incorrect`, HttpStatus.NOT_FOUND);


    }
    

    async delete(paramId: number): Promise<User[]>{
        const id = +paramId;
        this.repository.delete(id);
        return this.repository.find();
    }
}
