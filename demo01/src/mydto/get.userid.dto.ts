
import { Get } from '@nestjs/common';
import { IsNegative, IsNotEmpty, IsPositive } from 'class-validator';

export class GetUserIdDto {

    @IsPositive()
    @IsNotEmpty()
    id!: number;
}