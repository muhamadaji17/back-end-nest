import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CustomersModule } from './customers/customers.module';

import { SequelizeModule } from '@nestjs/sequelize';
import { ProductCategoryModule } from './product_category/product_category.module';
import { CategoryDtoModule } from './category-dto/category-dto.module';
import { ProductDtoModule } from './product-dto/product-dto.module';
import { OrdersModule } from './orders/orders.module';
import { LoginModule } from './login/login.module';
import { CheckRoles, CheckToken } from 'src/middleware/token.middleware';
import { GuardModule } from './guard/guard.module';
import { CobaModule } from './coba/coba.module';
import { LogoutModule } from './logout/logout.module';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: () => ({
        dialect: 'postgres',
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: 'dian151403',
        database: "eCommers",
        models: [],
        autoLoadModels: true,
      })
    }),
    UsersModule,
    CustomersModule,
    ProductCategoryModule,
    CategoryDtoModule,
    ProductDtoModule,
    OrdersModule,
    LoginModule,
    GuardModule,
    CobaModule,
    LogoutModule
   ],
  controllers: [],
  providers: [],
})
//guard
export class AppModule{}


//middleware
// export class AppModule implements NestModule{
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(CheckToken, CheckRoles)
//     .exclude(
//       {path:'users', method: RequestMethod.GET},
//       {path:'product-dto', method: RequestMethod.GET},
//       'login/(.*)'
//       )
//     .forRoutes('*')
//   }
// }
