import "dotenv/config";
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma.config/prisma.module';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ProductsModule } from './products/products.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


@Module({
  imports: [PrismaModule,AuthModule, UsersModule,
     JwtModule.register({
      global: true,
      secret:  process.env.SECRET_JWT,
      signOptions: { expiresIn: '180s' },
    }),
    // 1. ServeStaticModule MUST go here in AppModule
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..','..', 'upload'), 
      serveRoot: '/products/upload', 
    }),
     ProductsModule,

  ],

  // controllers: [AppController],
  // providers: [PrismaService,AppService],
  
})
export class AppModule {}
