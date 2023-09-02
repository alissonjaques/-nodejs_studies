import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { IsReal } from '../validators/real.validator';
import { IsNonNegative } from '../validators/non-negative-integer.validator';
import { ProductFeatureDTO } from './ProductFeature.dto';
import { ProductImageDTO } from './ProductImage.dto';
import { Type } from 'class-transformer';
import { HasMinOneImagesValidator } from '../validators/has-min-one-images.validator';
import { HasMinThreeFeaturesValidator } from '../validators/has-min-three-features.validator';

export class CreateProductDTO {
  @IsNotEmpty({ message: 'O campo nome não pode ser vazio' })
  name: string;

  @IsReal()
  value: number;

  @IsNonNegative()
  availableQuantity: number;

  @IsNotEmpty({ message: 'O campo descrição não pode ser vazio' })
  @MinLength(6, { message: 'A descrição deve possuir pelo menos 6 caracteres' })
  @MaxLength(1000, {
    message: 'A descrição deve possuir no máximo 1000 caracteres',
  })
  description: string;

  @ValidateNested({ message: 'O campo caracteristicas é inválido' })
  @IsArray({
    message: 'O campo carateristicas deve ser um vetor de carateristicas',
  })
  @Type(() => ProductFeatureDTO)
  @HasMinThreeFeaturesValidator()
  features: ProductFeatureDTO[];

  @ValidateNested({ message: 'O campo imagens é inválido' })
  @IsArray({
    message: 'O campo imagens deve ser um vetor de imagens',
  })
  @Type(() => ProductImageDTO)
  @HasMinOneImagesValidator()
  images: ProductImageDTO[];

  @IsNotEmpty({ message: 'O campo categoria não pode ser vazio' })
  category: string;

  creationDate: Date;
  updateDate: Date;
}
