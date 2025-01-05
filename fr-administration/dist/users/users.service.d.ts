import { User } from './users.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/roles/roles.entity';
export declare class UsersService {
    private repository;
    private rolesRepository;
    constructor(repository: Repository<User>, rolesRepository: Repository<Role>);
    create(lastname: string, firstname: string, age: number, password: string): Promise<User>;
    getAll(): Promise<User[]>;
    getById(id: any): Promise<User>;
    getAllRolesById(paramId: number): Promise<Role[]>;
    update(id: number, lastname: string, firstname: string, age: number, password: string): Promise<User>;
    delete(id: number): Promise<User>;
}
