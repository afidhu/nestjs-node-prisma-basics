
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthMiddleware } from './middleware/auth.middleware';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService] //NB, ONLY EXPORT THE SERVICE, NOT THE CONTROLLER OR MODULE, BECAUSE THE CONTROLLER IS ONLY USED FOR HANDLING HTTP REQUESTS, WHILE THE SERVICE IS USED FOR BUSINESS LOGIC AND CAN BE USED IN OTHER MODULES
})

//THIS WITH MIDDLEWARE, SO WE CAN USE THE SERVICE FROM ANOTHER MODULE(like feature in flutter(bloc) ) WITHOUT EXPORTING THE SERVICE IN THE MODULE WHERE IT IS DEFINED, AND IMPORTING THE MODULE WHERE WE WANT TO USE THE SERVICE.
// export class AuthModule {} //THIS WITHOUT MIDDLEWARE, SO WE CAN NOT USE THE SERVICE FROM ANOTHER MODULE(like feature in flutter(bloc) ) WITHOUT EXPORTING THE SERVICE IN THE MODULE WHERE IT IS DEFINED, AND IMPORTING THE MODULE WHERE WE WANT TO USE THE SERVICE.
export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('auth'); //NB, THIS IS HOW TO USE MIDDLEWARE IN NESTJS, BY IMPLEMENTING THE NESTMODULE INTERFACE AND OVERRIDING THE CONFIGURE METHOD, AND THEN APPLYING THE MIDDLEWARE TO THE ROUTES WE WANT TO USE IT ON.
  }
}  //THIS WITH MIDDLEWARE, SO WE CAN USE THE SERVICE FROM ANOTHER MODULE(like feature in flutter(bloc) ) WITHOUT EXPORTING THE SERVICE IN THE MODULE WHERE IT IS DEFINED, AND IMPORTING THE MODULE WHERE WE WANT TO USE THE SERVICE.


//|||||||||||||||||||||||| CAN ALSO DO AS

// export class AuthModule implements NestModule {
//     configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(AuthMiddleware)
//       .forRoutes(AuthController)
//   }
// } 

///|||||||||||||||| OR AS 

// export class AuthModule implements NestModule {
//     configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(AuthMiddleware)
//       .forRoutes({
//         path:'auth',
//          method: RequestMethod.POST
//       })
//   }
// } 


///|||||||||||||||| OR AS 

// export class AuthModule implements NestModule {
//     configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(AuthMiddleware)
//       .forRoutes({
//         path:'auth/:id',
//          method: RequestMethod.POST
//       })
//   }
// } 


///|||||||||||||||| OR AS FOR MUILTIPLE ROUTES

// export class AuthModule implements NestModule {
//     configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(AuthMiddleware)
//       .forRoutes({
//         path:'auth',
//          method: RequestMethod.POST
//       })

//       .apply(AuthMiddleware)
//       .forRoutes({
//         path:'auth/:id',
//          method: RequestMethod.PATCH
//       },{
//         path:'auth/:id',
//          method: RequestMethod.DELETE
//       }
//     )
//   }
// } 