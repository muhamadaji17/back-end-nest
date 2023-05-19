import { Module } from '@nestjs/common';
import { CategoryDtoService } from './category-dto.service';
import { CategoryDtoController } from './category-dto.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { product_category } from 'models';

@Module({
  imports: [SequelizeModule.forFeature([product_category])],
  controllers: [CategoryDtoController],
  providers: [CategoryDtoService]
})
export class CategoryDtoModule {}
