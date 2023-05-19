import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateOrderDto {
    @IsNotEmpty({message: 'ID Tidak boleh Kosong'})
    @IsNumber()
    id_users: number

}
