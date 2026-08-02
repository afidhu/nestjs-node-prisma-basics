
import { IsNotEmpty, IsString, IsEmail, IsOptional, MinLength, IsInt, Min, Max, IsPhoneNumber } from 'class-validator';
export class CreateAuthDto {

        @IsNotEmpty()
    @IsString({message:'name must be a string'}) //can customize the error message
    name!: string;

    @IsEmail({allow_display_name:true})
    @IsOptional() // this means the email is optional
    email!:string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password!: string;

    @IsInt()
    @IsNotEmpty()
    @Min(1)
    @Max(100)
    age!: number;

    @IsNotEmpty()
    @IsPhoneNumber('TZ') // this means the phone number should be a valid phone number in Tanzania
    phone!:string // can be 255 622962973 or +255 622962973 or 0622962973 or 622962973
}
