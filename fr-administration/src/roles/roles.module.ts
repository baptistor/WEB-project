import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './roles.entity';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { UsersModule } from 'src/users/users.module';


@Module({
    imports :[TypeOrmModule.forFeature([Role]), forwardRef(() => UsersModule)],
    controllers: [RolesController],
    providers: [RolesService],
    exports:[RolesService]
})
export class RolesModule {}

