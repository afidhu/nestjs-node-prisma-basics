import { IsAlpha, IsEmail, IsNotEmpty, IsPhoneNumber, IsPositive, Min, minLength, MinLength } from "class-validator";

export class CreateAuthDto {

    @IsNotEmpty()
    @IsAlpha()
    name!:string;

    @IsEmail()
    @IsNotEmpty()
    email!:string;

    @IsNotEmpty()
    @MinLength(3)
    password!:string

    @IsPositive()
    @Min(5)
    age!:number;

    @MinLength(9)
    @IsPhoneNumber('TZ')
    phone!:string;
}
