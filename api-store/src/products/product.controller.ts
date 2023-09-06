import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateProductDTO } from './dto/CreateProduct.dto';
import { ProductService } from './product.service';
import { ProductEntity } from './entities/product.entity';
import { ProductFeatureEntity } from './entities/product-feature.entity';
import { ProductImageEntity } from './entities/product-image.entity';

@Controller('/produtos')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  async createProduct(@Body() createProductDTO: CreateProductDTO) {
    const productEntity = new ProductEntity();
    productEntity.userId = createProductDTO.userId;
    productEntity.name = createProductDTO.name;
    productEntity.value = createProductDTO.value ?? 0;
    productEntity.availableQuantity = createProductDTO.availableQuantity;
    productEntity.description = createProductDTO.description;
    productEntity.category = createProductDTO.category;
    productEntity.features = createProductDTO.features;
    productEntity.images = createProductDTO.images;
    await this.productService.create(productEntity);
  }

  @Get()
  async listProduct() {
    return await this.productService.list();
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: number) {
    await this.productService.delete(id);
  }
}
