import { IsNotEmpty } from "class-validator";

export class CreateProductDto {

    @IsNotEmpty()
    title!:string
    @IsNotEmpty()
    content!:string
    @IsNotEmpty()
    authorId!:number

}
