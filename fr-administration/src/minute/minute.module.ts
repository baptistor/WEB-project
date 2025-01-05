import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Minute } from './minute.entity';
import { MinuteController } from './minute.controller';
import { MinuteService } from './minute.service';
import { UsersModule } from 'src/users/users.module';
import { AssociationsModule } from 'src/associations/associations.module';

@Module({
  imports: [TypeOrmModule.forFeature([Minute]), UsersModule, AssociationsModule],
  controllers: [MinuteController],
  providers: [MinuteService],
  exports: [MinuteService]

})
export class MinuteModule {}