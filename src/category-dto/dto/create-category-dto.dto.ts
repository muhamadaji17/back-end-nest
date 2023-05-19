import {  IsNotEmpty } from "class-validator"

export class CreateCategoryDtoDto {
    @IsNotEmpty({message : 'Name Harus di isi'})
    name: string

    @IsNotEmpty({message: 'Description Harus di isi'})
    description: string
}
