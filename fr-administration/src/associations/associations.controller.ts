import { Controller, Get, HttpException, HttpStatus, Param, Post, Body, Put, Delete, Query } from '@nestjs/common';
import { Association } from './associations.entity';
import { AssociationsService } from './associations.service';
import { User } from 'src/users/users.entity';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { AssociationParameter } from './associations.parameter';
import { AssociationInput } from './associations.input';
import { AssociationDTO } from './associations.dto';
import { Minute } from 'src/minute/minute.entity';

@Controller('associations')
export class AssociationsController {
    constructor(private service: AssociationsService) {}
    @Get()
    async getAll():Promise<AssociationDTO[]>{
        return await this.service.getAll();
    }
    @Get(':id')
    async getById(@Param() parameter: AssociationParameter): Promise<AssociationDTO>{
        const s = await this.service.getById(+parameter.id);
        if (!s){
            throw new HttpException(`Could not find an association with the id ${parameter.id}`, HttpStatus.NOT_FOUND);
        }
        return s;
    }
    @Post()
    @ApiCreatedResponse({
        description: 'The association has been successfully created.'
    })
    async create(@Body() input: AssociationInput): Promise<AssociationDTO>{
        return await this.service.create(input.idUsers, input.name);
    }
    @Put(':id')
    async update(@Param() parameter: AssociationParameter, @Body() input: AssociationInput): Promise<AssociationDTO>{
        const s = await this.service.update(+parameter.id,input.idUsers,input.name);
        if (!s){
            throw new HttpException(`Could not find an association with the id ${parameter.id}`, HttpStatus.NOT_FOUND);
        }
        return s;
    }
    @Delete(':id')
    async delete(@Param() parameter: AssociationParameter): Promise<AssociationDTO>{
        const s = await this.service.delete(+parameter.id);
        if(!s){
            throw new HttpException(`Could not find an association with the id ${parameter.id}`, HttpStatus.NOT_FOUND); 
        }
        return s;
    }
    @Get(':id/members')
    async getMembers(@Param() parameter: AssociationParameter): Promise<User[]> {
        const u = await this.service.getMembers(+parameter.id);
        if(!u){
            throw new HttpException(`Could not find an association with the id ${parameter.id}`, HttpStatus.NOT_FOUND); 
        }
        return u;
    }

    @Get(':id/minutes')
    async getMinutes(@Param() parameter: AssociationParameter, @Query('sort') sort: string, @Query('order') order: 'ASC' | 'DESC'): Promise<Minute[]>{
        const s = await this.service.getById(+parameter.id);
        if (!s){
            throw new HttpException(`Could not find an association with the id ${parameter.id}`, HttpStatus.NOT_FOUND);
        }
        
        if (sort && sort !== 'date') {
            throw new HttpException('Invalid sort parameter, only "date" is allowed.', HttpStatus.BAD_REQUEST);
        }
        if (order && !['ASC', 'DESC'].includes(order)) {
            throw new HttpException('Invalid order parameter, only "ASC" or "DESC" are allowed.', HttpStatus.BAD_REQUEST);
        }

        const minutes = await this.service.getMinutes (+parameter.id, sort || 'date', order || 'ASC');
        if(!minutes){
            throw new HttpException(`Could not find an association with the id ${parameter.id}`, HttpStatus.NOT_FOUND); 
        }
        return minutes;
    }
}
