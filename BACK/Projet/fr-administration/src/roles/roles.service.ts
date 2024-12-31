import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './roles.entity';
import { Repository } from 'typeorm';
import { AssociationsService } from 'src/associations/associations.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.entity';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private repository: Repository<Role>,
        @Inject(forwardRef(() => UsersService))
        private userRepository: UsersService
    ) {}

    async getAll(): Promise<Role[]> {
        return this.repository.find();
    }

    async getByUserAndAssoId(paramIdUser: number, paramIdAsso: number): Promise<Role> {
        const role = await this.repository.findOne({
            where: {
                user: { id: paramIdUser },
                association: { id: paramIdAsso },
            },
        });
        return role;
    }
    

    async getUserByRolesName(name: string): Promise<User[]> {
        const role = await this.repository.find({ where: { name: name } })
        if (!role){
            return null;
        }

        const user : User[] = await Promise.all(role.map(user => {
        return this.userRepository.getById(user.idUser);
        
        }));
        return user;
    }
    



    async create(name: string, idUser: number, idAssociation: number): Promise<Role> {
        if ((name !== undefined  && idUser !== undefined && idAssociation!== undefined)){
            const role = this.repository.create({ name, idUser, idAssociation });
            return this.repository.save(role);
        }
        return null;
    }



    async update(name: string, paramIdUser: number, paramIdAsso: number): Promise<Role>{
        if (name !== undefined) {
            const role = await this.repository.findOne({
                where: {
                    user: { id: paramIdUser },
                    association: { id: paramIdAsso },
                },
            });
            if (!role){
                return null;
            }
            role.name = name;
            const savedRole = await this.repository.save(role);
            return savedRole;

        }

        throw new HttpException(
            `Manque un nom pour le nouveau rôle`, HttpStatus.BAD_REQUEST);
    }

    async delete(idUser: number, idAssociation: number): Promise<Boolean>{
        const delRole = await this.repository.delete({ idUser, idAssociation });
        return delRole.affected > 0;
    }
}
