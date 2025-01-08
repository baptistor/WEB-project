import { Module } from '@nestjs/common';
import { AssociationsController } from './associations.controller';
import { AssociationsService } from './associations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { Association } from './associations.entity';
import { Minute } from 'src/minute/minute.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Association,User,Minute])],
  controllers: [AssociationsController],
  providers: [AssociationsService],
  exports: [AssociationsService]


})
export class AssociationsModule {}
