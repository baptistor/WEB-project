import { Association } from './associations.entity';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { AssociationDTO } from './associations.dto';
export declare class AssociationsService {
    private repository;
    private userRepository;
    constructor(repository: Repository<Association>, userRepository: Repository<User>);
    private toAssociationDTO;
    getAll(): Promise<AssociationDTO[]>;
    getById(id: any): Promise<AssociationDTO>;
    create(idUsers: number[], name: string): Promise<AssociationDTO>;
    update(id: number, idUsers: number[], name: string): Promise<AssociationDTO>;
    delete(id: number): Promise<AssociationDTO>;
    getMembers(id: number): Promise<User[]>;
}
