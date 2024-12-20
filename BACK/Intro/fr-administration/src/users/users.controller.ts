import { Controller, Get, Post,Param, Body, Put, Delete, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';


import { ApiProperty } from "@nestjs/swagger";
import { AuthGuard } from '@nestjs/passport';

export class UserInput {

    @ApiProperty({
        description: 'The firstname of the user',
        example: "John",
        type: String,
    })
    public firstname: string;

    @ApiProperty({
        description: 'The lastname of the user',
        example: "Doe",
        type: String,
    })
    public lastname: string;

    @ApiProperty({
        description: 'The age of the user',
        minimum: 18,
        default: 18,
        type: Number,
    })
    public age: number;

    @ApiProperty({
        description: 'Mdp pour authentifier l utilisateur',
        example: "Azerty123",
        type: String,
    })
    public password: string;
}



@ApiTags('users')   
@Controller('users')
export class UsersController {

    constructor(
        private services: UsersService
    ) {}
    
    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getAll(): Promise<User[]> {
        return this.services.getAll();
    }

    @Get(':id')
    async getById(@Param() parameter): Promise<User>{
        return this.services.getById(parameter.id) 
    }


    @Post()
    @ApiCreatedResponse({
        description: 'The user has been successfully created.'
    })
    public async create(@Body() input: UserInput): Promise<User> {
        return this.services.create(input.firstname, input.lastname, input.age, input.password);
    }


    @Put(':id')
    @ApiCreatedResponse({
        description: 'Utilisateur bien mis a jour'
    })
    async update(@Body() input: any, @Param() parameter): Promise<User>{
        return this.services.update(input.lastname, input.firstname, input.age, input.password , parameter.id);
    }

    @Put('pwd/:id')
    @ApiCreatedResponse({
        description: 'Mot de passe bien mis a jour'
    })
    async updatepwd(@Body() input: any, @Param() parameter): Promise<User>{
        return this.services.updatePwdById(parameter.id, input.oldid, input.newid);
    }




    @Delete(':id')
    async delete(@Param() parameter): Promise<User[]>{
        return this.services.delete(parameter.id);
    }
}



