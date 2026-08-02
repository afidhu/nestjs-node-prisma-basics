import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.config/prisma.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService,  private jwtService: JwtService) { }

  async create(createAuthDto: CreateAuthDto): Promise<any> {
    try {
      const saltOrRounds = 10;
      // const password = 'random_password';
      const hash = await bcrypt.hash(createAuthDto.password, saltOrRounds);

            const user = await this.prisma.user.create({
               data:{
                age:createAuthDto.age,
                email:createAuthDto.email,
                password:hash,
                name:createAuthDto.name,
                phone:createAuthDto.phone,
               }
            })
      console.log('users', user)

      return user;
    } catch (error: any) {
      console.log('error at:', error.message)
      return {message:"internal error", error:error.message}
    }
  }

async loginUser(loginAuthDto: LoginAuthDto){
  try {
    console.log(loginAuthDto.email,loginAuthDto.password);

    const user = await this.prisma.user.findUnique({
      where:{
        email:loginAuthDto.email
      },
      select:{
        id:true,
        age:true,
        email:true,
        password:true,
        name:true,
        role:true
      }
    })
    if(user != null){
    const payload = { username: user.name,email:user.email, role:user.role };
     const access_token = await this.jwtService.signAsync(payload)
     return {user:user,token:access_token};
    }

  } catch (error:any) {
    return {message:"internal error", error:error.message}
  }
}



 async findAll() {
    try {
      const users = await this.prisma.user.findMany()
    return users
    } catch (error:any) {
    return {message:"internal error", error:error.message}
    }
  }

 async findOne(id: number) {
    try {

      const user =await this.prisma.user.findFirst({
        where:{
          id:id,
        }
      })
      if(user != null){
        return user
      }
      else{
        return []
      }
   } catch (error:any) {
    return {message:"internal error", error:error.message}
    }
  
  }

  async update(id: number, updateAuthDto: UpdateAuthDto) {

    try {
          const updates = await this.prisma.user.update({
      where:{
        id:id,
      },
      data:updateAuthDto
    })
   return updates;
      
    } catch (error:any) {
    return {message:"internal error", error:error.message}
    }
  }

 async remove(id: number) {
    try {
   await this.prisma.user.delete({
        where:{
          id:id
        }
      })
      return {message:'deleted success'}
    } catch (error:any) {
    return {message:"internal error", error:error.message}
    }
  }
}
