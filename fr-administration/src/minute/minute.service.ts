import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Minute } from './minute.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { AssociationsService } from 'src/associations/associations.service';
import { User } from 'src/users/users.entity';
import { min } from 'rxjs';

@Injectable()
export class MinuteService {
    constructor(
            @InjectRepository(Minute)
            private repository: Repository<Minute>,
            private userServ: UsersService,
        ){}
    
        async getAll(): Promise<Minute[]> {
            return this.repository.find();
        }
    
        async getByMinuteId(paramId: number): Promise<Minute> {
            const id = +paramId;
            return this.repository.findOneBy({id})

        }
    
        async create(content: string, idVoters: number[], date: string, idAssociation: number): Promise<Minute> {
            if (content !== undefined && idVoters !== undefined && date !== undefined && idAssociation !== undefined) {
                const minute = await this.repository.create({content, date, idAssociation});
                const tabUsers : User[] = [];
                for (let i = 0; i<idVoters.length; i++) {
                    const user = await this.userServ.getById(idVoters[i]);
                    if (!user) {
                        throw new HttpException(`User with ID ${idVoters[i]} not found`, HttpStatus.NOT_FOUND);
                    }
                    tabUsers.push(user);
                } 
                minute.voters=tabUsers;
                const savedMinute = await this.repository.save(minute);
                return savedMinute;
            }
            return null;    
        }


        async update(newContent: string ,paramId: number): Promise<Minute> {
            const minute = await this.repository.findOne({ where: { id: paramId } });
            minute.content=newContent
            const updatedMinute = await this.repository.save(minute);
            return updatedMinute;
        }
    
    
        async delete(paramId: number): Promise<Boolean>{
            const id = +paramId;
            const delMinute = await this.repository.delete({id});
            return delMinute.affected > 0;

        }
    }
