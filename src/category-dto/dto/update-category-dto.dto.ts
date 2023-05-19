import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDtoDto } from './create-category-dto.dto';


export class UpdateCategoryDtoDto extends PartialType(CreateCategoryDtoDto) {
    
}
