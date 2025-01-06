import { Module } from '@nestjs/common';
import { AssociationsController } from './associations.controller';
import { AssociationsService } from './associations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { Association } from './associations.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Association,User])],
  controllers: [AssociationsController],
  providers: [AssociationsService],
})
export class AssociationsModule {}
