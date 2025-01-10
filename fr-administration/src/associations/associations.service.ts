import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
        const members: Member[] = await Promise.all(
            (association.users ?? []).map(async (user) => {
                let role = user.roles?.find(role => role.association?.id === association.id);
                if (!role) {
                    role = await this.roleServ.create('Membre', user.id, association.id);
                }
                return new Member(user.id, user.lastname, user.firstname, user.age, role.name);
            })
        );
        return new AssociationDTO(association.id, association.name, members);
    }
    
    async getAll():Promise<AssociationDTO[]>{
        const s = await this.repository.find({relations: ['users', 'users.roles', 'users.roles.association']});
        return Promise.all(s.map(asso=>this.toAssociationDTO(asso)));
    }
    async getById(id: number): Promise<AssociationDTO>{
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
        await this.roleServ.create('Président', idUsers[0], asso.id)
        return await this.getById(asso.id); //pour avoir les dépendances de rôles
    }
    async update(id : number, idUsers : number[], name : string): Promise<AssociationDTO>{
        const s = await this.repository.findOne({where: {id: Equal(id)}});
        if (!s){
            return undefined;
        }
        let idPres=0;
        if (idUsers !== undefined ){
            const users = await this.userRepository.find({where: {id: In(idUsers)}});
            if (users.length !== idUsers.length){
                return undefined;
            }
            let index=0;


            while(index<s.roles.length){
                if(s.roles[index].name === 'Président'){
                    idPres=s.roles[index].idUser;
                    break
                }
                else{
                    index++
                }
            }

            if(index===s.roles.length){
                console.log("PAS DE PRESIDENT DANS L ASSO = PROBLEME")
                throw new HttpException(`PAS DE PRESIDENT DANS L ASSO = PROBLEME`, HttpStatus.NOT_FOUND);
                
            }

            for(let i:number = 0 ; i<s.roles.length;i++){
                await this.roleServ.delete(s.roles[i].idUser, id);
            }
            s.users = users;


        }
        if (name !== undefined ){
            s.name = name;
        }

        await this.repository.save(s);

        await this.roleServ.create('Président', +idPres, id);

        return await this.getById(s.id); 
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