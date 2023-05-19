import { IsNotEmpty, IsNumber, IsMimeType } from "class-validator";


export class CreateProductDtoDto {
    @IsNotEmpty({message: 'Name must be define'})
    name: string
    
    @IsNotEmpty({message: 'Description must be define'})
    description: string
    
    @IsNotEmpty({message: 'Category ID must be define'})
    product_category_id: number
    
    @IsNotEmpty({message: 'Price must be define'})
    price: string
    


}
