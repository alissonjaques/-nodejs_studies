import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class ProductImageDTO {
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
}
