import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { order_detail, orders, product } from 'models';

@Module({
  imports: [SequelizeModule.forFeature([orders, order_detail, product])],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
