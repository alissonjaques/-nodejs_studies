import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { ProductFeatureDTO } from '../dto/ProductFeature.dto';

@ValidatorConstraint({ name: 'hasMinThreeFeatures', async: false })
export class HasMinThreeFeatures implements ValidatorConstraintInterface {
  validate(features: ProductFeatureDTO[], args: ValidationArguments) {
    return Array.isArray(features) && features.length >= 3;
  }

  defaultMessage(args: ValidationArguments) {
    return 'O vetor de caracteristicas deve conter pelo menos três caracteristicas.';
  }
}

export function HasMinThreeFeaturesValidator(
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'hasMinThreeFeatures',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: HasMinThreeFeatures,
    });
  };
}
