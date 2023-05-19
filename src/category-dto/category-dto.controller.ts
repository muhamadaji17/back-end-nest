import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { CategoryDtoService } from './category-dto.service';
import { CreateCategoryDtoDto } from './dto/create-category-dto.dto';
import { UpdateCategoryDtoDto } from './dto/update-category-dto.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('category-dto')
export class CategoryDtoController {
  constructor(private readonly categoryDtoService: CategoryDtoService) {}

  
  @Post('create')
  create(@Body() createCategoryDtoDto: CreateCategoryDtoDto) {
    return this.categoryDtoService.create(createCategoryDtoDto);
  }

  @Get()
  findAll() {
    return this.categoryDtoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryDtoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDtoDto: UpdateCategoryDtoDto) {
    return this.categoryDtoService.update(+id, updateCategoryDtoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryDtoService.remove(+id);
  }
}
