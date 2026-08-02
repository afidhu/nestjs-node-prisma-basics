/*
https://docs.nestjs.com/modules
*/

import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // This makes the exports available everywhere automatically
@Module({
    imports: [],
    controllers: [],
    providers: [PrismaService],
    exports:[PrismaService]
})
export class PrismaModule {}
