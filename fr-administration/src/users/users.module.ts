import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { RolesModule } from 'src/roles/roles.module';
import { Role } from 'src/roles/roles.entity';
import { AssociationsModule } from 'src/associations/associations.module';

@Module({
  imports: [TypeOrmModule.forFeature([User,Role]), forwardRef(() => RolesModule), forwardRef(() => AssociationsModule)],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
