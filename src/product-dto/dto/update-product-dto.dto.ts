import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDtoDto } from './create-product-dto.dto';

export class UpdateProductDtoDto extends PartialType(CreateProductDtoDto) {}
