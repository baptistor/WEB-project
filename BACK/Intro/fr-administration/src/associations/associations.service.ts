import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Association } from './associations.entity';
import { UsersService} from '../users/users.service';
import { User } from 'src/users/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class AssociationsService {


    constructor(
        @InjectRepository(Association)
        private repository: Repository<Association>,
        private service: UsersService
    ) {}
    
    async getAll(): Promise<Association[]> {
        return this.repository.find();
    }

    async getById(paramId: number): Promise<Association> {
        const id = +paramId;
        if (this.repository.findOneBy({id}) === undefined ) {
            throw new HttpException(`Could not find an association with the id ${paramId}`, HttpStatus.NOT_FOUND)        
        }
        return this.repository.findOneBy({id}); 
    }



    async create(name: string, users: number[]): Promise<Association> {
        if ((name !== undefined  && users !== undefined)){
            const asso = await this.repository.create({name: name});
            const tabUsers : User[] = [];
            for (let i = 0; i<users.length; i++) {
                const user = await this.service.getById(users[i]);
                tabUsers.push(user);
            } 
            asso.users=tabUsers;
            const savedAsso = await this.repository.save(asso);
            return savedAsso;
        }
        throw new HttpException(`Manque un ou plusieurs paramètres pour créer l'association`, HttpStatus.NOT_FOUND)        
    }



    async update(name: string, users: User[], paramId: number): Promise<Association>{
        if (name !== undefined && users !== undefined) {
            const asso = await this.repository.findOne({ where: { id: paramId } });
    
            if (!asso) {
                throw new HttpException(`Utilisateur avec l'ID ${paramId} introuvable`, HttpStatus.NOT_FOUND);
            }
    
            asso.name = name;
            asso.users = users
            const updateAsso = await this.repository.save(asso);
    
            return updateAsso;
        }
    
        throw new HttpException(
            `Manque un ou plusieurs paramètres pour mettre à jour le User qui a comme ID : ${paramId}`,
            HttpStatus.BAD_REQUEST,
        );    }

    async delete(paramId: number): Promise<Association[]>{
        this.repository.delete(paramId);
        return this.repository.find();
    }

    async getUserByAssociationId(paramId: number): Promise<User[]>{
        const id = +paramId;
        if (this.repository.findOneBy({id}) === undefined ) {
            throw new HttpException(`Could not find an association with the id ${paramId}`, HttpStatus.NOT_FOUND)        
        }
        const association = await this.repository.findOne({
            where: { id: id },
            relations: ['users'], 
          });
      
          if (!association) {
            throw new Error(`Association avec ID ${id} introuvable`);
          }
      
          return association.users; 
    }
}
