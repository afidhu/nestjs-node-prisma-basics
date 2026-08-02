import { Controller, Get, Post } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getProduct() {
    return this.productService.getAllProducts();
  }

  @Post('interModuleCommunication')
  interModuleCommunication() :any{
    return this.productService.interModuleCommunication();
  }
}