import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDTO } from './dto/CreateProduct.dto';

@Controller('/produtos')
export class ProductController {
  constructor(private productRepository: ProductRepository) {}

  @Post()
  async createProduct(@Body() CreateProductDTO: CreateProductDTO) {
    await this.productRepository.save(CreateProductDTO);
  }

  @Get()
  async listProduct() {
    return await this.productRepository.list();
  }
}
