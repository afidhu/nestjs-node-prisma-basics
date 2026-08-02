
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [AuthModule, ProductModule],
  controllers: [AppController],
  providers: [
   AppService],
})
export class AppModule { }

//FULL DOCS ABOUT IMPORT AND EXPORT MODULE IN NESTJS
//https://docs.nestjs.com/modules#module-imports-and-exports

//In order to one service to be used in another module, we need to export the service in the module where it is defined, and import the module where we want to use the service. 
// In this case, we want to use the AuthService in the ProductModule, so we need to export the AuthService in the AuthModule, and import the AuthModule in the ProductModule.
//NB, CAN NOT USE THE SERVECES FROM ANOTHER MODULE(like feature in flutter(bloc) ) WITHOUT EXPORTING THE SERVICE IN THE MODULE WHERE IT IS DEFINED, AND IMPORTING THE MODULE WHERE WE WANT TO USE THE SERVICE.