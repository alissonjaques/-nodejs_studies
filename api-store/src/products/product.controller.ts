import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductRepository } from './product.repository';

@Controller('/produtos')
export class ProductController {
  constructor(private productRepository: ProductRepository) {}

  @Post()
  async createUser(@Body() userData) {
    await this.productRepository.save(userData);
  }

  @Get()
  async listUser() {
    return await this.productRepository.list();
  }
}
