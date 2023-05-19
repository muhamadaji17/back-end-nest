import {Module} from '@nestjs/common'
import { APP_GUARD, Reflector } from '@nestjs/core';
import { SequelizeModule } from '@nestjs/sequelize';
import { users } from 'models';
import { AuthGuard } from './auth.guard';

@Module({
    imports: [SequelizeModule.forFeature([users])],
    controllers:[],
    providers:[
        {
            provide: APP_GUARD,
            useClass: AuthGuard
        },
        Reflector
    ],
})
export class GuardModule{}