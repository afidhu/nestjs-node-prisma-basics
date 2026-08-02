import { Controller,Redirect, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('user')
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('user/login')
  login(@Req() req:any, @Body() loginAuthDto: LoginAuthDto){
    console.log('my age is',req.body.age)
    return this.authService.loginUser(loginAuthDto)
  }

  @Get('user')
    @UseGuards(AuthGuard,RolesGuard) //you can  i set it global in authmodule
    @Roles(['User'])
    
  findAll() {
    return this.authService.findAll();
  }

  @Get('user/:id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  // @Redirect('url', 200)
  @Patch('user/:id')
  update(@Param('id',ParseIntPipe) id: number, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete('user/:id')
  remove(@Param('id',ParseIntPipe) id: string) {
    return this.authService.remove(+id);
  }
}
