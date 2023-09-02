import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

@ValidatorConstraint({ name: 'isNonNegativeInteger', async: false })
export class IsNonNegativeInteger implements ValidatorConstraintInterface {
  validate(value: number, args: ValidationArguments) {
    if (
      typeof value !== 'number' ||
      isNaN(value) ||
      value < 0 ||
      !Number.isInteger(value)
    ) {
      return false;
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return 'A quantidade disponível deve ser um número inteiro maior ou igual a zero.';
  }
}

export function IsNonNegative(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isNonNegative',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsNonNegativeInteger,
    });
  };
}
