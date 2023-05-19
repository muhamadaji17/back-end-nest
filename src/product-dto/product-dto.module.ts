import { Module } from '@nestjs/common';
import { ProductDtoService } from './product-dto.service';
import { ProductDtoController } from './product-dto.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { product, product_category } from 'models';

@Module({
  imports: [SequelizeModule.forFeature([product, product_category])],
  controllers: [ProductDtoController],
  providers: [ProductDtoService]
})
export class ProductDtoModule {}
