import { Injectable } from '@nestjs/common';
import { Association } from './associations.entity';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, In, Repository } from 'typeorm';
import { AssociationDTO } from './associations.dto';
import { Member } from './associations.member';

@Injectable()
export class AssociationsService {
    constructor(
        @InjectRepository(Association)
        private repository: Repository<Association>,
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}
    private async toAssociationDTO(association: Association): Promise<AssociationDTO> {
            const members: Member[] = (association.users ?? []).map(user => {
            const role = user.roles?.find(role => role.association?.id === association.id);
            return new Member(user.lastname,user.firstname, user.age, role?.name || undefined,);
        });
        return new AssociationDTO(association.name, members);
    }
    async getAll():Promise<AssociationDTO[]>{
        const s = await this.repository.find({relations: ['users']});
        return Promise.all(s.map(asso=>this.toAssociationDTO(asso)));
    }
    async getById(id): Promise<AssociationDTO>{
        const s = await this.repository.findOne({where: {id: Equal(id)}, relations: ['users']});
        return await this.toAssociationDTO(s); 
    }
    async create(idUsers : number[], name : string): Promise<AssociationDTO>{
        const users = await this.userRepository.find({where: {id: In(idUsers)}});
        if (users.length !== idUsers.length){
            return undefined;
        }
        const newAssociation = await this.repository.create({
            name,
            users
        });
        await this.repository.save(newAssociation);
        return await this.toAssociationDTO(newAssociation);
    }
    async update(id : number, idUsers : number[], name : string): Promise<AssociationDTO>{
        const s = await this.repository.findOne({where: {id: Equal(id)}});
        if (!s){
            return undefined;
        }
        if (idUsers !== undefined ){
            const users = await this.userRepository.find({where: {id: In(idUsers)}});
            if (users.length !== idUsers.length){
                return undefined;
            }
            s.users = users;
        }
        if (name !== undefined ){
            s.name = name;
        }
        this.repository.save(s);
        return await this.toAssociationDTO(s); 
    }
    async delete(id:number): Promise<AssociationDTO>{
        const s = await this.repository.findOne({where: {id: Equal(id)}});
        if(!s){
            return undefined; 
        }
        await this.repository.delete(id);
        return await this.toAssociationDTO(s); 
    }
    async getMembers(id:number): Promise<User[]> {
        const s = await this.repository.findOne({where: {id: Equal(id)},relations: ['users']});

        if(!s){
            return undefined;
        }

        return s.users;
    }
}