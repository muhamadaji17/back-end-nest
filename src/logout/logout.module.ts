import { Module } from '@nestjs/common';
import { LogoutService } from './logout.service';
import { LogoutController } from './logout.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { users } from 'models';

@Module({
  imports: [SequelizeModule.forFeature([users])],
  controllers: [LogoutController],
  providers: [LogoutService]
})
export class LogoutModule {}
