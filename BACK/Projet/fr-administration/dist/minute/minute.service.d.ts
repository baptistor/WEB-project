import { Minute } from './minute.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
export declare class MinuteService {
    private repository;
    private userServ;
    constructor(repository: Repository<Minute>, userServ: UsersService);
    getAll(): Promise<Minute[]>;
    getByMinuteId(paramId: number): Promise<Minute>;
    create(content: string, idVoters: number[], date: string, idAssociation: number): Promise<Minute>;
    update(newContent: string, paramId: number): Promise<Minute>;
    delete(paramId: number): Promise<Boolean>;
}
