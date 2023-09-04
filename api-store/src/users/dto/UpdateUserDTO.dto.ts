import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { EmailIsUnique } from '../validators/email-is-unique.validator';

export class UpdateUserDTO {
  @IsNotEmpty({ message: 'O campo nome não pode ser vazio' })
  @IsOptional()
  name: string;

  @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
  @EmailIsUnique({
    message: 'Já existe usuário cadastrado no sistema com o e-mail informado.',
  })
  @IsOptional()
  email: string;

  @MinLength(6, { message: 'A senha deve possuir pelo menos 6 caracteres' })
  @IsOptional()
  password: string;
}
