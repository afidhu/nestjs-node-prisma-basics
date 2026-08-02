import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { AuthGuard } from './auth/guards/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // this means that any properties that are not in the DTO will be stripped from the request body
    forbidNonWhitelisted: true, // this means that if any properties that are not in the DTO are present in the request body, an error will be thrown
    transform: true,
    transformOptions: { 
      enableImplicitConversion: false // this means that the data will be transformed to the type defined in the DTO even if the type is not explicitly defined in the DTO
    }
  }));
  // app.useGlobalGuards(new AuthGuard());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
