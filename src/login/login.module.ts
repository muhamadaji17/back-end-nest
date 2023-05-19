import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { users } from 'models';

@Module({
  imports: [SequelizeModule.forFeature([users])],
  controllers: [LoginController],
  providers: [LoginService]
})
export class LoginModule {}
