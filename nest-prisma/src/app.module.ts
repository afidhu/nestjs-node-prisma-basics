import { SocketModule } from './socket/socket.module';

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

import { BackgroundJobsModule } from './background-jobs/background-jobs.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SocketGateway } from './socket/socket.gateway';

@Module({
  imports: [ SocketModule,
    PrismaModule,
    AuthModule,
    UsersModule,
    BackgroundJobsModule,
    ProductsModule,


    // ScheduleModule.forRoot(), // for cron jobs


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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
