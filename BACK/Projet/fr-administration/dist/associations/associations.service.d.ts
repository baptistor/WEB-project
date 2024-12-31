import { Association } from './associations.entity';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { AssociationDTO } from './associations.dto';
export declare class AssociationsService {
    private repository;
    private service;
    constructor(repository: Repository<Association>, service: UsersService);
    private toAssociationDTO;
    getAll(): Promise<AssociationDTO[]>;
    getById(paramId: number): Promise<AssociationDTO>;
    create(name: string, users: number[]): Promise<AssociationDTO>;
    update(name: string, users: number[], paramId: number): Promise<AssociationDTO>;
    delete(paramId: number): Promise<Boolean>;
    getUserByAssociationId(paramId: number): Promise<User[]>;
}
