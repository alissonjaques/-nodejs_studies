import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { EmailIsUnique } from '../validators/email-is-unique.validator';

export class CreateUserDTO {
  @IsNotEmpty({ message: 'O campo nome não pode ser vazio' })
  name: string;

  @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
  @EmailIsUnique({
    message: 'Já existe usuário cadastrado no sistema com o e-mail informado.',
  })
  email: string;

  @MinLength(6, { message: 'A senha deve possuir pelo menos 6 caracteres' })
  password: string;
}
