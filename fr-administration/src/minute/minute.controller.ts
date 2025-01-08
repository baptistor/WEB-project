import { MinuteInput } from './minute.input';
import { MinuteUpdate } from './minute.update';
import { MinuteService } from './minute.service';
import { Minute } from './minute.entity';
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { min } from 'rxjs';




@Controller('minutes')
export class MinuteController {
    constructor(private services: MinuteService) {}

    @Get()
    async getAll(): Promise<Minute[]> {
        return await this.services.getAll();
    }

    @Get(':idMinute')
    async getById(@Param() parameter): Promise<Minute> {
        const minute = await this.services.getByMinuteId(parameter.idMinute);
        if (!minute) {
            throw new HttpException(`Could not find a user with the id: ${parameter.idMinute}`, HttpStatus.NOT_FOUND)        
        }
        return minute;
    }

    



    @Post()
    @ApiCreatedResponse({
        description: 'Minute bien créée'
    })
    async create(@Body() input: MinuteInput): Promise<Minute> {
        const minute= await this.services.create(input.content, input.idVoters, input.date, input.idAssociation);
        if(!minute){
            throw new HttpException(`Manque un ou plusieurs paramètres pour créer la minute: content`, HttpStatus.NOT_FOUND)  ;      
        }
        return minute;


    }


    @Put(':idMinute')
    async update(@Body() input: MinuteUpdate, @Param() parameter): Promise<Minute>{
        const minute = await this.services.update(input.content, parameter.idMinute)
        if (!minute) {
            throw new HttpException(`Minute avec l'ID ${parameter.idMinute} introuvable`, HttpStatus.NOT_FOUND);
        }
        return minute
    }



    @Delete(':idMinute')
    async delete(@Param() parameter): Promise<Boolean>{
        const minuteSuppr = await this.services.delete(parameter.idMinute);
        if (!minuteSuppr){
            throw new HttpException(`Minute avec l'ID ${parameter.idMinute} introuvable`, HttpStatus.NOT_FOUND);
        }
        
        return minuteSuppr

    }
}
