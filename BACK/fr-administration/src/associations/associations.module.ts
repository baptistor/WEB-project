import { Module } from '@nestjs/common';
import { AssociationsController } from './associations.controller';
import { AssociationsService } from './associations.service';
import { UsersModule } from 'src/users/users.module';
import { Association } from './associations.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports :[TypeOrmModule.forFeature([Association]), UsersModule],
  controllers: [AssociationsController],
  providers: [AssociationsService],
})
export class AssociationsModule {}
