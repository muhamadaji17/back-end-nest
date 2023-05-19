import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductDtoService } from './product-dto.service';
import { CreateProductDtoDto } from './dto/create-product-dto.dto';
import { UpdateProductDtoDto } from './dto/update-product-dto.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('product-dto')
export class ProductDtoController {
  constructor(private readonly productDtoService: ProductDtoService) {}

  
  @Post('/create')
  @UseInterceptors(FileInterceptor('image',{
    storage: diskStorage({
        destination: './public/images/',
        filename: (req,file,cb) => {
            const timeStamp = new Date().getTime()
            const originalName = file.originalname
            cb(null, `Product-${timeStamp}-${originalName}`)
        }
      })
    }))
    postfile(
        @Body() createProductDtoDto: CreateProductDtoDto ,
        @UploadedFile() file: Express.Multer.File
        ) {
          return this.productDtoService.create(createProductDtoDto, file);
        }

  @Get()
  findAll() {
    return this.productDtoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productDtoService.findOne(+id);
  }

  @Patch('/:id')
  @UseInterceptors(FileInterceptor('image',{
    storage: diskStorage({
        destination: './public/images/',
        filename: (req,file,cb) => {
            const timeStamp = new Date().getTime()
            const originalName = file.originalname
            cb(null, `Product-${timeStamp}-${originalName}`)
        }
      })
    }))
  update(
      @Param('id') id:number,
      @Body() updateProductDtoDto: UpdateProductDtoDto ,
      @UploadedFile() file: Express.Multer.File
      ) {
        // console.log(updateProductDtoDto)
        return this.productDtoService.update(id, updateProductDtoDto, file);
      }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productDtoService.remove(+id);
    // return `a`
  }

  // @Get('prodcat')
  // prodcat(){
  //   return this.productDtoService.GetProductandCategory()
  // }
}
