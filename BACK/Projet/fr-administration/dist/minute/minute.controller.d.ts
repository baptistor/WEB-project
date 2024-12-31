import { MinuteInput } from './minute.input';
import { MinuteUpdate } from './minute.update';
import { MinuteService } from './minute.service';
import { Minute } from './minute.entity';
export declare class MinuteController {
    private services;
    constructor(services: MinuteService);
    getAll(): Promise<Minute[]>;
    getById(parameter: any): Promise<Minute>;
    create(input: MinuteInput): Promise<Minute>;
    update(input: MinuteUpdate, parameter: any): Promise<Minute>;
    delete(parameter: any): Promise<Boolean>;
}
