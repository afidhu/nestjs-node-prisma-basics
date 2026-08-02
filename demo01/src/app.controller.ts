import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { MyUserCreateDto } from './mydto/myuser.create.dto';
import { GetUserIdDto } from './mydto/get.userid.dto';
import { UpdateUser } from './mydto/update.user.dto';
// import { UpdateUserOldDto } from './mydto/update.user.dto';


@Controller('users')
export class AppController {
  constructor(private  appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('postHello')
  myGetHello(): string {
    return 'Hello World first time! alll';
  }
  @Get()
  myU(){
    return this.appService.getUser()
  }


  @Post()
  addUser(){
   const user = { name: 'String', age: 1}
   return this.appService.createUser(user)
  
  
  }

  @Post()
  postHello(): string {
    return this.appService.getHello();
  }

  // |||Parameter

 // @Get(':id')
  // @Get(':id/:age?') // this meas the parameter age is optional, but id is required
  // @Get(':id')
  // getuserId(@Param('id') myId :Number){
  //   return {id:myId}
  // }

  //   @Get(':id/:age')
  // getuserId(
  //   //  @Param() param:any, //This get all parameters pass
  //   @Param('id') myId :Number,
  //   @Param('age') age :Number,
  // ){
  //   // console.log(param)
  //   return {id:myId, age:age}
  // }

  //Query
  
  @Get('usersQuery')
  // userGuery(@Query('age') qur:any){
   // return `${qur}`
  userGuery(@Query() qur:any){
    if(qur === null){
      return 'pass age'
    }
    console.log(qur)
    return this.appService.getQuery(qur.age)
  }

    @Get('usersQueryItem')
  // userGuery(@Query('age') qur:any){
   // return `${qur}`
  userGueryItem(@Query('age') qur:any){
    if(qur.age === null){
      return 'pass age'
    }
    console.log(qur)
    return this.appService.getQuery(qur.age)
  }

  //|||||||||||||||||||||| HERE PIPES|||||||||||||||||||||||||||||||||||
  //there are used to velidate and parse data to certain datatype
  //NB, only=> ValidationPipe and DefaultValuePipe use keyword new, the rest are used directly

  @Get('pipe/:page')
  getPipe(@Param('page',ParseIntPipe) pg:Number){
    console.log(typeof(pg))
    return 'has parsed to initiger'
  }

    @Get('pipes/:page')
  getPipes(@Param('page', new DefaultValuePipe(10)) pg:Number){ // if the parameter is not passed it will take the default value of 1
    console.log(typeof(pg))
    
    // return 'has parsed to initiger'
  }

      @Get('pipesQuery')
  getPipesQuery(@Query('page',new DefaultValuePipe(10),ParseIntPipe) pg:Number){ // if the parameter is not passed it will take the default value of 1
    console.log(typeof(pg))
    return this.appService.getQuery(pg)
  }

  /// BODY
    @Post('user/add')
  create(@Body() body:any): string {
console.log(body)
    return 'fine body';
  }
  

  
  // other way to use pipe is to create a custom pipe and use it in the controller
//   Built-in pipes#
// Nest comes with several pipes available out-of-the-box:

// ValidationPipe
// ParseIntPipe
// ParseFloatPipe
// ParseBoolPipe
// ParseArrayPipe
// ParseUUIDPipe
// ParseEnumPipe
// DefaultValuePipe
// ParseFilePipe
// ParseDatePipe


///|||||Pipes for Body(large data) validation|||||||||||||||||||||||||||||||||||||||||||||||||
 //|||||||||||||||||||||||||||DTO|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

  @Post('userdto/add')

  creates(@Body() body:any): string {
console.log(body)
    return 'fine body';
  }

  //||||||||THIS IS PER REQUEST VALIDATION USING DTO||||||||||||||||
//    @Post('userdto/adds')
//   createTdo(@Body( new ValidationPipe()) dto:MyUserCreateDto): string {
// console.log(dto)
//     return 'fine dto';
//   }
  


  //FOR GLOBAL VALIDATION USING DTO, GO TO main.ts(all requests will be validated) and add the following code
  //=> app.useGlobalPipes(new ValidationPipe())

  //////////////OR//////////
  // app.useGlobalPipes(new ValidationPipe({
  //   whitelist:true, // this means that any property that is not in the DTO will be stripped off
  //   forbidNonWhitelisted:true, // this means that if any property that is not in the DTO is passed, it will throw an error
  //   transform:true, // this means that the data will be transformed to the type defined in the DTO
  //   transformOptions:{enableImplicitConversion:true} // this means that the data will be transformed to the type defined in the DTO even if the type is not explicitly defined in the DTO
  // }))

  //  i use global validation in main.ts, so i will not use it here, but if you want to use it here, you can uncomment the code above and comment the code in main.ts
      
  @Post('userdto/adds')
  createTdoByGlobal(@Body() dto:MyUserCreateDto): any {
console.log(dto)
// console.log(dto instanceof MyUserCreateDto)
    return {message:'fine dto', data:dto};
  }
  
  @Get('myagid/:id/:age')
  @Get('myagid/:id')
  getuserIdAge(@Param('id', ParseIntPipe) id:number, @Param('age', ParseIntPipe) age?:number):any{
    console.log({id, age})
return {id, age}
  }

  @Get('myagidDto/:id')
  getUserByTDo(@Param() param:GetUserIdDto):any{
return param
  }

  //The following is an example of how to use DTO for update user, but i will not use it here, because i have already used PartialType in update.user.dto.ts to make all properties optional, so i will not use it here, but if you want to use it here, you can uncomment the code below and comment the code in update.user.dto.ts
  // @Patch(':id')
  // updateUser(@Param('id', ParseIntPipe) id:number, @Body() body:UpdateUserOldDto):any{
  //   return {id, body}
  // }

  // THis modern 

    @Patch(':id')
 private updateUser(@Param() id:GetUserIdDto, @Body() body:UpdateUser):any{
    return {id, body}
  }
  //NB, Can set f() as Private, Public, Protected, or any other access modifier, but it is not recommended to set it as private, because it will not be accessible from outside the class, so it is better to set it as public or protected
  //protected means it will be accessible from the class and its subclasses, but not from outside the class, while public means it will be accessible from anywhere, even outside the class.
}
