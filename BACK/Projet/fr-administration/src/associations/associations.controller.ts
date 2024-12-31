    import { Controller, Get, Post,Param, Body, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
    import { AssociationsService } from './associations.service';
    import { Association } from './associations.entity';
    import { User } from 'src/users/users.entity';
    import { ApiCreatedResponse, ApiProperty } from "@nestjs/swagger";
import { AssociationDTO } from './associations.dto';



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
        async getAll(): Promise<AssociationDTO[]> {
            return this.services.getAll();
        }

        @Get(':id')
        async getById(@Param() parameter): Promise<AssociationDTO> {
            const assoDTO = await this.services.getById(parameter.id) 
            if (!assoDTO){
                throw new HttpException(`Aucune association ne correspond à cet ID : ${parameter.id}`, HttpStatus.NOT_FOUND)        
            }
            return assoDTO;
        }



        @Post()
        @ApiCreatedResponse({
            description: 'Asso bien créée'
        })
        async create(@Body() input: AssoInput): Promise<AssociationDTO> {
            const assoDTO = await this.services.create(input.name, input.idUsers);
            if (!assoDTO){
                throw new HttpException(`Manque un ou plusieurs paramètres pour créer l'association`, HttpStatus.NOT_FOUND);       
            }
            return assoDTO;

        }


        @Put(':id')
        async update(@Body() input: any, @Param() parameter): Promise<AssociationDTO>{
            const assoDTO =await this.services.update(input.name, input.idUsers, parameter.id)
            if (!assoDTO){
                throw new HttpException(`Aucune association ne correspond à cet ID : ${parameter.id}`, HttpStatus.NOT_FOUND)        
            }
            return assoDTO;
        }



        @Delete(':id')
        async delete(@Param() parameter): Promise<Boolean>{
            const delAsso = await this.services.delete(parameter.id);
            if (!delAsso){
                throw new HttpException(`Aucune association ne correspond à cet ID : ${parameter.id}`, HttpStatus.NOT_FOUND)        
            }
            return delAsso;


        }

        @Get(':id/members')
        async getMembers(@Param() parameter): Promise<User[]> {
            const assoDTO = await this.services.getUserByAssociationId(parameter.id);
            if (!assoDTO){
                throw new HttpException(`Aucune association ne correspond à cet ID : ${parameter.id}`, HttpStatus.NOT_FOUND)        
            }
            return assoDTO;
        }
    }