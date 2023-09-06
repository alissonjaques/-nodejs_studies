import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { ProductFeatureEntity } from '../entities/product-feature.entity';
import { ProductEntity } from '../entities/product.entity';

export class ProductFeatureDTO {
  id: number;

  @IsNotEmpty({ message: 'O campo nome não pode ser vazio' })
  name: string;

  @IsNotEmpty({ message: 'O campo descrição não pode ser vazio' })
  @MinLength(3, { message: 'A descrição deve possuir pelo menos 3 caracteres' })
  @MaxLength(1000, {
    message: 'A descrição deve possuir no máximo 1000 caracteres',
  })
  description: string;

  product: ProductEntity;
}
