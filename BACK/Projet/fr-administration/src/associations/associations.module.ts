import { Module } from '@nestjs/common';
import { AssociationsController } from './associations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Association } from './associations.entity';
import { UsersModule } from 'src/users/users.module';
import { AssociationsService } from './associations.service';

@Module({
  imports :[TypeOrmModule.forFeature([Association]), UsersModule],
  controllers: [AssociationsController],
  providers: [AssociationsService],
  exports : [AssociationsService]

})
export class AssociationsModule {}
