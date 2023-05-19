import { Injectable } from '@nestjs/common';
import { CreateCategoryDtoDto } from './dto/create-category-dto.dto';
import { UpdateCategoryDtoDto } from './dto/update-category-dto.dto';
import { product_category } from 'models';

@Injectable()
export class CategoryDtoService {
  
async create(createCategoryDtoDto: CreateCategoryDtoDto) :Promise<any> {
  try {
    const data = await product_category.create({
        name: createCategoryDtoDto.name,
        description: createCategoryDtoDto.description
      })
      return data
  } catch (error) {
    return error.message
  }  
  }

 async findAll() :Promise<any> {
  try {
    const data = await product_category.findAll({
      limit: 2
    })
    if(!data){
      throw new Error(`Data Not Found`)
    }
    return data
  } catch (error) {
    return error.message
  }

  }

  async findOne(id: number): Promise<any> {
    try {
      const data = await product_category.findByPk(id)
      if(!data){
        throw new Error(`Data not found`)
      }
      return data
    } catch (error) {
      return error.message
    }
  }

  async update(id: number, updateCategoryDtoDto: UpdateCategoryDtoDto) :Promise<any> {
    try {
      const data = await product_category.update({
        name: updateCategoryDtoDto.name,
        description: updateCategoryDtoDto.description
      },{
        where:{
          id:id
        }
      })
      return data
    } catch (error) {
      return error.message
    }
  }

  async remove(id: number) :Promise<any> {
    try {
      const data = await product_category.destroy({
        where:{
          id:id
        }
      })
      if(!data){
        throw new Error('Data not found')
      }
      return ` ID ${id} Telah Terhapus`
    } catch (error) {
      return error.message
    }
  }
}
