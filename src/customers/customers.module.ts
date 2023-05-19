import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { customer, users } from 'models';

@Module({
    imports: [SequelizeModule.forFeature([customer, users])],
    controllers: [CustomersController],
    providers: [CustomersService]})

export class CustomersModule {
  
}
