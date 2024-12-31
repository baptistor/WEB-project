import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { RoleInput } from './roles.input';
import { RoleUpdate } from './roles.update';
import { RolesService } from './roles.service';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { Role } from './roles.entity';
import { User } from 'src/users/users.entity';


@Controller('roles')
export class RolesController {
    constructor(private services: RolesService) {}

    @Get()
    async getAll(): Promise<Role[]> {
        return this.services.getAll();
    }

    @Get('users/:name')
    async getUserByRolesName(@Param() parameter): Promise<User[]> {
        const user= await this.services.getUserByRolesName(parameter.name)
        
        if (!user) {
            throw new HttpException(`Il n'y a pas d'utilisateur ayant ce nom de rôle: ${parameter.name} `,HttpStatus.NOT_FOUND,);
        }

        return user;
    }

    @Get(':idUser/:idAsso')
    async getById(@Param() parameter): Promise<Role> {
        const role= await this.services.getByUserAndAssoId(parameter.idUser, parameter.idAsso)
        
        if (!role) {
            throw new HttpException(`Il n'y a pas de rôle avec l'utilisateur ID: ${parameter.idUser} et l'association ID: ${parameter.idAsso}`,HttpStatus.NOT_FOUND,);
        }

        return role;
    }

    @Post()
    @ApiCreatedResponse({
        description: 'Asso bien créée'
    })
    async create(@Body() input: RoleInput): Promise<Role> {
        const role = await this.services.create(input.name, input.idUser, input.idAssociation);
        if (!role) {
            throw new HttpException(`Manque un ou plusieurs paramètres pour créer le role`, HttpStatus.NOT_FOUND)        
        }
        return role;
    }


    @Put(':idUser/:idAsso')
    async update(@Body() input: RoleUpdate, @Param() parameter): Promise<Role>{
        const role = await this.services.update(input.name, parameter.idUser, parameter.idAsso)
        if (!role) {
            throw new HttpException(`Il n'y a pas de rôle avec l'utilisateur ID: ${parameter.idUser} et l'association ID: ${parameter.idAsso}`,HttpStatus.NOT_FOUND,);
        }
        return role;
    }



    @Delete(':idUser/:idAsso')
    async delete(@Param() parameter): Promise<Boolean>{
        return this.services.delete(parameter.idUser, parameter.idAsso);


    }
}
