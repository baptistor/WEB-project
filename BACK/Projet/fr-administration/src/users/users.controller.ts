import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { ApiCreatedResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/roles/roles.entity';


export class UserInput {

    @ApiProperty({
        description: 'Nom de l utilisateur',
        example: "Krugs",
        type: String,
    })
    public name: string;

    @ApiProperty({
        description: 'Prénom de l utilisateur',
        example: "Bapt",
        type: String,
    })
    public firstname: string;

    @ApiProperty({
        description: 'Age de l utilisateur',
        minimum: 18,
        example: 21,
        type: Number,
    })
    public age: number;

    @ApiProperty({
        description: 'Mot de passe de l utilisateur',
        example: "mdp1234",
        type: String,
    })
    public password: string;
}



@ApiTags('users')   
@Controller('users')
export class UsersController {
    constructor(private services: UsersService){}

    @Get()
    async getAll(): Promise<User[]> {
        return this.services.getAll();
    }

    @Get(':id')
    async getById(@Param() parameter): Promise<User>{
        const user = await this.services.getById(parameter.id);
        if (!user) {
            throw new HttpException(`Could not find a user with the id ${parameter.id}`, HttpStatus.NOT_FOUND)        
        }
        return user;
    }

    @Get(':id/roles')
    async getAllRolesById(@Param() parameter): Promise<Role[]>{
        const user = await this.services.getAllRolesById(parameter.id);
        if (!user) {
            throw new HttpException(`Could not find a user with the id ${parameter.id}`, HttpStatus.NOT_FOUND)        
        }
        return user;
    }

    @Post()
    @ApiCreatedResponse({
        description: 'Utilisateur créé.'
    })
    public async create(@Body() input: UserInput): Promise<User> {
        const user = await this.services.create(input.name, input.firstname, input.age, input.password);
        if (!user) {
            throw new HttpException(`Manque un ou plusieurs paramètres pour créer l'utilisateur`, HttpStatus.NOT_FOUND)  ;      
        }
        return user;
    }
    @Put(':id')
    @ApiCreatedResponse({
        description: 'Utilisateur mis a jour'
    })
    async update(@Body() input: any, @Param() parameter): Promise<User>{
        const user = await this.services.update(input.name, input.firstname, input.age, parameter.id);
        if (!user) {
            throw new HttpException(`Utilisateur avec l'ID: ${parameter.id} introuvable`, HttpStatus.NOT_FOUND);
        }
        return user;
    }
    @Delete(':id')
    async delete(@Param() parameter): Promise<Boolean>{
        const delUser= this.services.delete(parameter.id);
        if(!delUser){
            throw new HttpException(`Utilisateur avec l'ID: ${parameter.id} introuvable`, HttpStatus.NOT_FOUND);
        }
        return delUser
    }
}
