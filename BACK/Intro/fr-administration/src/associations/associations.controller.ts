import { Controller, Get, Post,Param, Body, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { AssociationsService } from './associations.service';
import { Association } from './associations.entity';
import { User } from 'src/users/users.entity';
import { ApiCreatedResponse, ApiProperty } from "@nestjs/swagger";



export class AssoInput {

    @ApiProperty({
        description: 'Nom de l association',
        example: "Asso2",
        type: String,
    })
    public name: string;

    @ApiProperty({
        description: 'The age of the user',
        example: [1,4],
        type: [Number],
    })
    public idUsers: number[];
}

@Controller('associations')
export class AssociationsController {


    constructor(
        private services: AssociationsService
    ) {}

    @Get()
    async getAll(): Promise<Association[]> {
        return this.services.getAll();
    }

    @Get(':id')
    async getById(@Param() parameter): Promise<Association> {
        return this.services.getById(parameter.id) 
    }



    @Post()
    @ApiCreatedResponse({
        description: 'Asso bien créée'
    })
    async create(@Body() input: AssoInput): Promise<Association> {
        return this.services.create(input.name, input.idUsers);
    }


    @Put(':id')
    async update(@Body() input: any, @Param() parameter): Promise<Association>{
        return this.services.update(input.name, input.idUsers, parameter.id)
    }



    @Delete(':id')
    async delete(@Param() parameter): Promise<Association[]>{
        return this.services.delete(parameter.id);


    }

    @Get(':id/members')
    async getMembers(@Param() parameter): Promise<User[]> {
        return this.services.getUserByAssociationId(parameter.id);
    }
}