import { Controller, Module } from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize'
import { product, product_category } from 'models';
import { ProductCategoryController } from './product_category.controller';
import { ProductCategoryService } from './product_category.service';
@Module({
    imports :[SequelizeModule.forFeature([product_category, product])],
    controllers: [ProductCategoryController],
    providers: [ProductCategoryService]
})
export class ProductCategoryModule {}
