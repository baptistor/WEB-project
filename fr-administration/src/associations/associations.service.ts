import { Injectable } from '@nestjs/common';
import { Association } from './associations.entity';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, In, Repository } from 'typeorm';
import { AssociationDTO } from './associations.dto';
import { Member } from './associations.member';
import { Role } from 'src/roles/roles.entity';
import { Minute } from 'src/minute/minute.entity';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class AssociationsService {
    constructor(
        @InjectRepository(Association)
        private repository: Repository<Association>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Minute)
        private minuteRepository: Repository<Minute>,
        private roleServ: RolesService
    ) {}
    private async toAssociationDTO(association: Association): Promise<AssociationDTO> {
            const members: Member[] = (association.users ?? []).map(user => {
            let role = user.roles?.find(role => role.association?.id === association.id);
            if (!role){
                const newRole= new Role(user.id,association.id,"member")
                role =newRole
            }
            return new Member(user.id,user.lastname,user.firstname, user.age, role.name);
        });
        return new AssociationDTO(association.id,association.name, members);
    }
    async getAll():Promise<AssociationDTO[]>{
        const s = await this.repository.find({relations: ['users', 'users.roles', 'users.roles.association']});
        return Promise.all(s.map(asso=>this.toAssociationDTO(asso)));
    }
    async getById(id): Promise<AssociationDTO>{
        const s = await this.repository.findOne({where: {id: Equal(id)}, relations: ['users', 'users.roles', 'users.roles.association']});
        return await this.toAssociationDTO(s); 
    }
    async create(idUsers : number[], name : string): Promise<AssociationDTO>{ // Le premier Utilisateur de idUsers[] aura automatiquement le Rôle président 
        const users = await this.userRepository.find({where: {id: In(idUsers)}});
        if (users.length !== idUsers.length){
            return undefined;
        }
        const newAssociation = await this.repository.create({
            name,
            users
        });
        const asso =await this.repository.save(newAssociation);
        this.roleServ.create('Président', idUsers[0], asso.id)
        for(let i = 1; i<idUsers.length; i++){
            this.roleServ.create('Membre', idUsers[i], asso.id)
        }
        return await this.getById(asso.id); //pour avoir les dépendances de rôles
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
    async delete(id:number): Promise<Boolean>{
        const s = await this.repository.findOne({where: {id: Equal(id)}});
        if(!s){
            return undefined; 
        }
        for (let i = 0; i<s.roles.length; i++){
            await this.roleServ.delete(+s.roles[i].idUser, id)
        }
        const assoSupp= await this.repository.delete(id);
        return assoSupp.affected>0; 
    }
    async getMembers(id:number): Promise<User[]> {
        const s = await this.repository.findOne({where: {id: Equal(id)},relations: ['users', 'users.roles', 'users.roles.association']});

        if(!s){
            return undefined;
        }

        return s.users;
    }

    async getMinutes(id:number, sort:string, order: 'ASC' | 'DESC'): Promise<Minute[]> {
        const minutes = await this.minuteRepository.find({where: {idAssociation: Equal(id)}, order: { [sort]: order },})

        if(!minutes){
            return undefined;
        }
        return minutes
    }
}