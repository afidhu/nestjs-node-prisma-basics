import { Controller, Get,UploadedFile,UseInterceptors,ParseFilePipe, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor, } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';



@UseGuards(AuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file: any, @Body() createProductDto: CreateProductDto) {
    return this.productsService.create(file.filename, createProductDto);
  }

  


// @Post('file')
// uploadFileAndPassValidation(
//   @Body() body:any,
//   @UploadedFile(
//     new ParseFilePipe({
//       validators: [
//         // ... Set of file validator instances here
//       ]
//     })
//   )
//   file: Express.Multe.File,
// ) {
//   return {
//     body,
//     file: file.buffer.toString(),
//   };
// }


// @Post('upload')
// @UseInterceptors(FileInterceptor('file'))
// uploadFile(@UploadedFile() file: any) {
//   console.log(file);
// }


// @Roles(['admin'])
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
