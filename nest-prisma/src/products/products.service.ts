import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.config/prisma.service';

@Injectable()
export class ProductsService {
  
    constructor(private readonly prisma: PrismaService,){}
 async create(fileName:string,createProductDto: CreateProductDto) {

   try {
      const baseUrl = 'http://localhost:3000/products/upload';
    const posted = await this.prisma.post.create({
    data:{
      title:createProductDto.title,
      content:createProductDto.content,
      authorId:+createProductDto.authorId,
      imageUrl:`${baseUrl}/${fileName}`
    }
   })
    return posted;
  }
    catch (error:any) {
    return {message:"inter error", error:error.message}
   }
   } 

 async findAll() {
   const product = await this.prisma.post.findMany()
   return product
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
