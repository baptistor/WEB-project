import { AssociationsService } from './associations.service';
import { User } from 'src/users/users.entity';
import { AssociationDTO } from './associations.dto';
export declare class AssoInput {
    name: string;
    idUsers: number[];
}
export declare class AssociationsController {
    private services;
    constructor(services: AssociationsService);
    getAll(): Promise<AssociationDTO[]>;
    getById(parameter: any): Promise<AssociationDTO>;
    create(input: AssoInput): Promise<AssociationDTO>;
    update(input: any, parameter: any): Promise<AssociationDTO>;
    delete(parameter: any): Promise<Boolean>;
    getMembers(parameter: any): Promise<User[]>;
}
