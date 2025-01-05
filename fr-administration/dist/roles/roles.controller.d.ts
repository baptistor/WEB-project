import { RoleInput } from './roles.input';
import { RoleUpdate } from './roles.update';
import { RolesService } from './roles.service';
import { Role } from './roles.entity';
import { User } from 'src/users/users.entity';
export declare class RolesController {
    private services;
    constructor(services: RolesService);
    getAll(): Promise<Role[]>;
    getUserByRolesName(parameter: any): Promise<User[]>;
    getById(parameter: any): Promise<Role>;
    create(input: RoleInput): Promise<Role>;
    update(input: RoleUpdate, parameter: any): Promise<Role>;
    delete(parameter: any): Promise<Boolean>;
}
