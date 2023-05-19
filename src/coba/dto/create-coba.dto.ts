import { IsNotEmpty } from "class-validator";

export class CreateCobaDto {
    @IsNotEmpty()
    name: string
}
