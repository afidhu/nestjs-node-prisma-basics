import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
//  @UseGuards( AuthGuard)  //THIS IS ALL BELLOW REQUESTS, SO IF THE GUARD RETURNS TRUE, THEN THE REQUEST WILL BE ALLOWED TO PROCEED, OTHERWISE IT WILL BE REJECTED.
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @UseGuards( AuthGuard) //THIS IS PER REQUESR GUARD, SO IF THE GUARD RETURNS TRUE, THEN THE REQUEST WILL BE ALLOWED TO PROCEED, OTHERWISE IT WILL BE REJECTED.
   // ALSO CAN USE GLOBAL GUARD, BY USING APP.GUARD IN MAIN.TS, SO THAT THE GUARD WILL BE APPLIED TO ALL REQUESTS, AND NOT JUST THIS CONTROLLER.
   //in main.ts, => app.useGlobalGuards(new AuthGuard()); //THIS IS GLOBAL GUARD, SO IT WILL BE APPLIED TO ALL REQUESTS, AND NOT JUST THIS CONTROLLER.
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get('all')
  findAll() {
    return this.authService.findAll();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
