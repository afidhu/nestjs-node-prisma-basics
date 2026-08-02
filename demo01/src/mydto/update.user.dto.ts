
// import { Optional } from "@nestjs/common";
// import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Max, Min, MinLength } from "class-validator";

import { PartialType } from "@nestjs/mapped-types";
import { MyUserCreateDto } from "./myuser.create.dto";


// export class UpdateUserOldDto{


//     @IsString()
//     @Optional()
//     name?: string;

//     @IsOptional() // this means the email is optional
//     email?:string;

//     @IsString()
//     @Optional()
//     password?: string;

//     @Optional()
//     @Min(1)
//     @Max(100)
//     age?: number;

//     @IsOptional()
//     @IsPhoneNumber('TZ') // this means the phone number should be a valid phone number in Tanzania
//     phone?:string // can be 255 622962973 or +255 622962973 or 0622962973 or 622962973
// }


/////||||||NB, now due to dry principle, we can use PartialType to create a new class that extends the CreateUserDto class and makes all the properties optional. This way, we don't have to repeat the validation decorators for each property. We can just use the PartialType function from @nestjs/mapped-types package.


export class UpdateUser extends PartialType(MyUserCreateDto) {}