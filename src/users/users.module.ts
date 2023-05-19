import { Module } from '@nestjs/common';
// import { TokenMiddleware  } from 'src/token/token.middleware';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import {users} from 'models'
import {customer} from 'models'


@Module({
    imports: [SequelizeModule.forFeature([users, customer])],
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule {
}
