import { Controller, Get, Post, Body, Patch, Put, Delete,Param} from '@nestjs/common';
import { ProductCategoryService } from './product_category.service';

@Controller('product-category')
export class ProductCategoryController {
    constructor(private product_categoryService:ProductCategoryService){}

    @Get()
    getAllProductCategory():any{
        return this.product_categoryService.getProduct_category()
    }

    @Post('create')
    Create(@Body () fields : any) {
        return this.product_categoryService.createProductCategory(fields)
    } 

    @Patch('update/:id')
    Update(
        @Param ('id') id: any,
        @Body () fields: any
    ){
        return this.product_categoryService.updateCategory(fields, id)
    }

    @Delete(':id')
    deleteCategory(@Param('id') id:any){
        return this.product_categoryService.deleteCategory(id)
    }

    @Get('prodcat')
    getProdCat(){
        return this.product_categoryService.getProdCat()
    }
}
