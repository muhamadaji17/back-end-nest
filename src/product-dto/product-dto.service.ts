import { Injectable } from '@nestjs/common';
import { CreateProductDtoDto } from './dto/create-product-dto.dto';
import { UpdateProductDtoDto } from './dto/update-product-dto.dto';
import { product, product_category } from 'models';
import { promises as fsPromises } from 'fs';


@Injectable()
export class ProductDtoService {

  async create(createProductDtoDto: CreateProductDtoDto, file : any) :Promise<any> {
    let data: any = ''
    try {
      // console.log(file)
       data = await product.create({
        name: createProductDtoDto.name,
        description:createProductDtoDto.description,
        product_category_id: createProductDtoDto.product_category_id,
        price: createProductDtoDto.price,
        image: file.filename
      })
      return data
    } catch (error) {
        const path = './public/images/' + file.filename
        if(fsPromises.access(path)){
          fsPromises.unlink(path)
        }
      
      return error.message
    }
  }

  async findAll() :Promise<any> {
    const data = await product.findAll()
    return data
  }

  async findOne(id: number) :Promise<any> {
    try {
      const data = await product.findByPk(id)
      if(!data){
        throw new Error('Product not found')
      }
      return data
    } catch (error) {
      return error.message
    }
  }

  async update(id: number, updateProductDtoDto: UpdateProductDtoDto, file : any) :Promise<any> {
    try {
      const find = await product.findByPk(id)
      if(!find){
        throw new Error('ID not found')
      }
      const path = './public/images/' + find.image
      if( fsPromises.access(path)){
        await fsPromises.unlink(path)
      }
      // console.log(updateProductDtoDto, id)
      const data = await product.update({
        name: updateProductDtoDto.name,
        description:updateProductDtoDto.description,
        product_category_id: updateProductDtoDto.product_category_id,
        price: updateProductDtoDto.price,
        image: file.filename
      },{
        where:{
          id: id
        }
      })
      return data
    } catch (error) {
      return error.message
    }
  }

async remove(id: number) :Promise<any>{
  try {
    const find = await product.findByPk(id)
    const path = './public/images/' + find.image
    if( fsPromises.access(path)){
      await fsPromises.unlink(path)
    }
    const data = await product.destroy({
      where: {
        id: id
      }
    })
    return `Data ${id} Telah di hapus`
  } catch (error) {
    return error.message
  }
  }


  //  GetProductandCategory(){
  //   const data = product_category.findAll({
  //     include: product,
  //     limit: 2
  // })
  // return data
  // }
}
