import { Role } from './roles.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.entity';
export declare class RolesService {
    private repository;
    private userRepository;
    constructor(repository: Repository<Role>, userRepository: UsersService);
    getAll(): Promise<Role[]>;
    getByUserAndId(paramIdUser: number, paramIdAsso: number): Promise<Role>;
    getUserByRolesName(name: string): Promise<User[]>;
    create(name: string, idUser: number, idAssociation: number): Promise<Role>;
    update(name: string, paramIdUser: number, paramIdAsso: number): Promise<Role>;
    delete(idUser: number, idAssociation: number): Promise<Boolean>;
}
