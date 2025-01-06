import { Controller, Get, HttpException, HttpStatus, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { Association } from './associations.entity';
import { AssociationsService } from './associations.service';
import { User } from 'src/users/users.entity';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { AssociationParameter } from './associations.parameter';
import { AssociationInput } from './associations.input';
import { AssociationDTO } from './associations.dto';

@Controller('associations')
export class AssociationsController {
    constructor(private service: AssociationsService) {}
    @Get()
    async getAll():Promise<AssociationDTO[]>{
        return this.service.getAll();
    }
    @Get(':id')
    async getById(@Param() parameter: AssociationParameter): Promise<AssociationDTO>{
        const s = this.service.getById(+parameter.id);
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
        return this.service.create(input.idUsers, input.name);
    }
    @Put(':id')
    async update(@Param() parameter: AssociationParameter, @Body() input: AssociationInput): Promise<AssociationDTO>{
        const s = this.service.update(+parameter.id,input.idUsers,input.name);
        if (!s){
            throw new HttpException(`Could not find an association with the id ${parameter.id}`, HttpStatus.NOT_FOUND);
        }
        return s;
    }
    @Delete(':id')
    async delete(@Param() parameter: AssociationParameter): Promise<AssociationDTO>{
        const s = this.service.delete(+parameter.id);
        if(!s){
            throw new HttpException(`Could not find an association with the id ${parameter.id}`, HttpStatus.NOT_FOUND); 
        }
        return s;
    }
    @Get(':id/members')
    async getMembers(@Param() parameter: AssociationParameter): Promise<User[]> {
        const u = this.service.getMembers(+parameter.id);
        if(!u){
            throw new HttpException(`Could not find an association with the id ${parameter.id}`, HttpStatus.NOT_FOUND); 
        }
        return u;
    }
}
