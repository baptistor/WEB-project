import { Controller,Post, Body, Get, Param, Put, Delete, HttpException, HttpStatus, UseGuards} from '@nestjs/common';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { UserInput } from './users.input';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { UserParameter } from './users.parameter';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/roles/roles.entity';

@Controller('users')
export class UsersController {
    constructor(private service: UsersService) {}
    @Post()
    @ApiCreatedResponse({
        description: 'The user has been successfully created.'
    })
    async create(@Body() input: UserInput): Promise<User>{
        return await this.service.create(input.lastname, input.firstname, input.age, input.password);
    }
    @Get()
    async getAll():Promise<User[]>{
        return await this.service.getAll();
    }
    @Get(':id')
    async getById(@Param() parameter: UserParameter): Promise<User>{
        const u = await this.service.getById(+parameter.id);
        if (!u){
            throw new HttpException(`Could not find a user with the id ${parameter.id}`, HttpStatus.NOT_FOUND);
        }
        return u;
    }
    @Get(':id/roles')
    async getAllRolesById(@Param() parameter): Promise<Role[]>{
        const user = await await this.service.getAllRolesById(parameter.id);
        if (!user) {
            throw new HttpException(`Could not find a user with the id ${parameter.id}`, HttpStatus.NOT_FOUND)        
        }
        return user;
    }
    @Put(':id')
    async update(@Param() parameter: UserParameter, @Body() input: UserInput): Promise<User>{
        const u = await this.service.update(+parameter.id,input.lastname,input.firstname,input.age,input.password);
        if (!u){
            throw new HttpException(`Could not find a user with the id ${parameter.id}`, HttpStatus.NOT_FOUND);
        }
        return u;
    }
    @Delete(':id')
    async delete(@Param() parameter: UserParameter): Promise<User>{
        const u = await this.service.delete(+parameter.id);
        if(!u){
            throw new HttpException(`Could not find a user with the id ${parameter.id}`, HttpStatus.NOT_FOUND); 
        }
        return u;
    }
}