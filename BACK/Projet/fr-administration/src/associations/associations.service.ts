import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Association } from './associations.entity';
import { UsersService} from '../users/users.service';
import { User } from 'src/users/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './associations.member';
import { AssociationDTO } from './associations.dto';


@Injectable()
export class AssociationsService {


    constructor(
        @InjectRepository(Association)
        private repository: Repository<Association>,
        private service: UsersService,
    ) {}


      // Transforme une Association en AssociationDTO
      private async toAssociationDTO(association: Association): Promise<AssociationDTO> {
        const members: Member[] = association.idUsers.map(user => {
            const role = user.roles?.find(role => role.association?.id === association.id);
            return new Member(user.name,user.firstname, user.age, role?.name || undefined,);
        });
        return new AssociationDTO(association.name, members);
    }
    
    
    async getAll(): Promise<AssociationDTO[]> {
        const asso = await this.repository.find();
        return Promise.all(asso.map(asso=>this.toAssociationDTO(asso)));
    }

    async getById(paramId: number): Promise<AssociationDTO> {
        const id = +paramId;
        const asso = await this.repository.findOneBy({id});
        return await this.toAssociationDTO(asso); 
    }

    async create(name: string, users: number[]): Promise<AssociationDTO> {
        if ((name !== undefined  && users !== undefined)){
            const tabUsers : User[] = [];
            for (let i = 0; i<users.length; i++) {
                const user = await this.service.getById(users[i]);
                if (!user) {
                    throw new HttpException(`User with ID ${users[i]} not found`, HttpStatus.NOT_FOUND);
                }
                tabUsers.push(user);
            }
            const asso = this.repository.create({name, idUsers: tabUsers})
            const savedAsso = await this.repository.save(asso);
            return this.toAssociationDTO(savedAsso);
        }
        return null
    }


    async update(name: string, users: number[], paramId: number): Promise<AssociationDTO>{
        if (name !== undefined && users !== undefined) {
            const asso = await this.repository.findOne({ where: { id: paramId } });
    
            if (!asso) {
                return null
            }
    
            asso.name = name;
            const tabUsers : User[] = [];
            for (let i = 0; i<users.length; i++) {
                const user = await this.service.getById(users[i]);
                if (!user) {
                    throw new HttpException(`User with ID ${users[i]} not found`, HttpStatus.NOT_FOUND);
                }
                tabUsers.push(user);
            } 

            asso.idUsers = tabUsers;
            const updateAsso = await this.repository.save(asso);
    
            return this.toAssociationDTO(updateAsso);
        }
    
        throw new HttpException(
            `Manque un ou plusieurs paramètres pour mettre à jour le User qui a comme ID : ${paramId}`,
            HttpStatus.BAD_REQUEST,
        );    }

    async delete(paramId: number): Promise<Boolean>{
        const delAsso=await this.repository.delete(paramId);
        return delAsso.affected>0;
    }

    async getUserByAssociationId(paramId: number): Promise<User[]>{
        const association = await this.repository.findOne({
            where: { id: +paramId},
            relations: ['idUsers'], 
        });
        if (!association){
            return null;
        }
        return association.idUsers; 
    }
}
