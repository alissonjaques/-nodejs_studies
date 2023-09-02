import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { ProductImageDTO } from '../dto/ProductImage.dto';

@ValidatorConstraint({ name: 'hasMinOneImages', async: false })
export class HasMinOneImages implements ValidatorConstraintInterface {
  validate(images: ProductImageDTO[], args: ValidationArguments) {
    return Array.isArray(images) && images.length >= 1;
  }

  defaultMessage(args: ValidationArguments) {
    return 'O vetor de imagens deve conter pelo menos uma imagem.';
  }
}

export function HasMinOneImagesValidator(
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'hasMinOneImages',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: HasMinOneImages,
    });
  };
}
