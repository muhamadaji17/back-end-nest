import { Injectable } from '@nestjs/common';
import { product, product_category } from 'models';

@Injectable()
export class ProductCategoryService {
   async getProduct_category():Promise<any>{
    try {
        const data = await product_category.findAll()

        return data
    } catch (error) {
        return error.message
    }
    }


    async getProdCat():Promise<any>{
        try {
            const data = await product_category.findAll({
                include:product,
                limit:2
            })
            return data
        } catch (error) {
         return error.message   
        }
    }

    async createProductCategory(fields : product_category) :Promise<any>{
        try {
            const data = await product_category.create({
                name: fields.name,
                description: fields.description
            })
            return data
        } catch (error) {
            return error.message
        }
    }

    async updateCategory( fields: any, id: any) :Promise<any>{
        try {
            const data = await product_category.update({
                name: fields.name,
                description: fields.description,
            }, {
                where: {
                    id: id
                }
            })
            return data
            // console.log(fields, id)
                      
            // const data = await product_category.update({
            //     name: fields.name,
            //     description: fields.description
            // },{

            //  where:{
            //     id: data.id
            //  }
            // })
            // return data
        } catch (error) {
            return error.message
        }
    }

    async deleteCategory(id: any) : Promise<any>{
        try {
            const data = await product_category.destroy({
                where:{
                    id: id
                }
            })
            return data
        } catch (error) {
            return error.message
        }
    }
}
