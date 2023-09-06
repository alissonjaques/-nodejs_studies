import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { ListProductDTO } from './dto/ListProductDTO.dto';
// import { UpdateProductDTO } from './dto/UpdateProductDTO.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async list() {
    const products = await this.productRepository.find();
    const listProducts = products.map((product) => new ListProductDTO(product));
    return listProducts;
  }

  async create(productEntity: ProductEntity) {
    await this.productRepository.save(productEntity);
  }
  /*
  async update(id: number, userEntity: UpdateProductDTO) {
    const possibleUser = await this.productRepository.findOne({ where: { id } });

    if (!possibleUser) {
      throw new Error('Usuário não existe');
    }

    await this.productRepository.update(id, userEntity);
  }
*/
  async delete(id: number) {
    const possibleProduct = await this.productRepository.findOne({
      where: { id },
    });

    if (!possibleProduct) {
      throw new Error(
        `Não foi possível excluir o produto, produto com id = ${id} não encontrado`,
      );
    }

    await this.productRepository.delete(id);
  }
}
