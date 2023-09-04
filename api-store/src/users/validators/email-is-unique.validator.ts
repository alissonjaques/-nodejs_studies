import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';

@Injectable()
@ValidatorConstraint({ name: 'hasMinOneImages', async: true })
export class EmailIsUniqueValidator implements ValidatorConstraintInterface {
  constructor(private userRepository: UserRepository) {}

  async validate(email: string, args: ValidationArguments): Promise<boolean> {
    const userWithEmailExistis =
      await this.userRepository.existsWithEmail(email);
    return !userWithEmailExistis;
  }
}

export function EmailIsUnique(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'emailIsUnique',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: EmailIsUniqueValidator,
    });
  };
}
