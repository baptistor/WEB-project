import { User } from './users.entity';
import { UsersService } from './users.service';
import { UserInput } from './users.input';
import { UserParameter } from './users.parameter';
import { Role } from 'src/roles/roles.entity';
export declare class UsersController {
    private service;
    constructor(service: UsersService);
    create(input: UserInput): Promise<User>;
    getAll(): Promise<User[]>;
    getById(parameter: UserParameter): Promise<User>;
    getAllRolesById(parameter: any): Promise<Role[]>;
    update(parameter: UserParameter, input: UserInput): Promise<User>;
    delete(parameter: UserParameter): Promise<User>;
}
