import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ProductEntity } from '../entities/product.entity';

export class ProductImageDTO {
  id: number;

  @IsNotEmpty({ message: 'O campo url não pode ser vazio' })
  url: string;

  @IsNotEmpty({ message: 'O campo descrição não pode ser vazio' })
  @MinLength(3, {
    message: 'O campo descrição deve possuir pelo menos 3 caracteres',
  })
  @MaxLength(1000, {
    message: 'O campo descrição deve possuir no máximo 1000 caracteres',
  })
  description: string;

  product: ProductEntity;
}
