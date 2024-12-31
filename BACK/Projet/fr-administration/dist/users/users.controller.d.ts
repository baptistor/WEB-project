import { UsersService } from './users.service';
import { User } from './users.entity';
import { Role } from 'src/roles/roles.entity';
export declare class UserInput {
    name: string;
    firstname: string;
    age: number;
}
export declare class UsersController {
    private services;
    constructor(services: UsersService);
    getAll(): Promise<User[]>;
    getById(parameter: any): Promise<User>;
    getAllRolesById(parameter: any): Promise<Role[]>;
    create(input: UserInput): Promise<User>;
    update(input: any, parameter: any): Promise<User>;
    delete(parameter: any): Promise<Boolean>;
}
