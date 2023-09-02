import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

@ValidatorConstraint({ name: 'isRealValue', async: false })
export class IsRealValue implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const valueString = value ? value.toString() : '';

    if (valueString.indexOf('.') !== -1) {
      const parts = valueString.split('.');
      if (parts[1].length > 2) {
        return false;
      }
    }

    if (typeof value !== 'number' || isNaN(value) || value <= 0) {
      return false;
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return 'O valor deve ser um número válido em Real (maior que zero) e com duas casas decimais';
  }
}

export function IsReal(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isReal',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsRealValue,
    });
  };
}
