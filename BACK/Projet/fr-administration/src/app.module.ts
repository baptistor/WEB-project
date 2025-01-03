import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { AssociationsModule } from './associations/associations.module';
import { RolesModule } from './roles/roles.module';
import { Association } from 'src/associations/associations.entity';
import { Role } from './roles/roles.entity';
import { MinuteService } from './minute/minute.service';
import { MinuteController } from './minute/minute.controller';
import { MinuteModule } from './minute/minute.module';
import { Minute } from './minute/minute.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [    TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'mydatabase.db',
    entities: [User, Association, Role, Minute],
    synchronize: true,
  }),UsersModule, AssociationsModule, RolesModule, MinuteModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
