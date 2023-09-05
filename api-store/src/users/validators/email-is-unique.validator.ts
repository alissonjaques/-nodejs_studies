import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
@ValidatorConstraint({ name: 'hasMinOneImages', async: true })
export class EmailIsUniqueValidator implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async validate(email: string, args: ValidationArguments): Promise<boolean> {
    const userWithEmailExistis = await this.userRepository.findOne({
      where: { email },
    });
    return !email || !userWithEmailExistis;
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
