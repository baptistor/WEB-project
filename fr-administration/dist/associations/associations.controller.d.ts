import { AssociationsService } from './associations.service';
import { User } from 'src/users/users.entity';
import { AssociationParameter } from './associations.parameter';
import { AssociationInput } from './associations.input';
import { AssociationDTO } from './associations.dto';
export declare class AssociationsController {
    private service;
    constructor(service: AssociationsService);
    getAll(): Promise<AssociationDTO[]>;
    getById(parameter: AssociationParameter): Promise<AssociationDTO>;
    create(input: AssociationInput): Promise<AssociationDTO>;
    update(parameter: AssociationParameter, input: AssociationInput): Promise<AssociationDTO>;
    delete(parameter: AssociationParameter): Promise<AssociationDTO>;
    getMembers(parameter: AssociationParameter): Promise<User[]>;
}
