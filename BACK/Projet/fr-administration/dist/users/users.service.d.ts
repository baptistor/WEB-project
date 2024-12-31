import { User } from './users.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/roles/roles.entity';
export declare class UsersService {
    private repository;
    private rolesRepository;
    constructor(repository: Repository<User>, rolesRepository: Repository<Role>);
    getAll(): Promise<User[]>;
    getById(paramId: number): Promise<User>;
    getAllRolesById(paramId: number): Promise<Role[]>;
    create(name: string, firstname: string, age: number): Promise<User>;
    update(name: string, firstname: string, age: number, paramId: number): Promise<User>;
    delete(paramId: number): Promise<Boolean>;
}
