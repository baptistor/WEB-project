import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { RolesModule } from 'src/roles/roles.module';
import { Role } from 'src/roles/roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,Role]), RolesModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
