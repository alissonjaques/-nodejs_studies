import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty({ message: 'O campo nome não pode ser vazio' }) nome: string;
  @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
  email: string;
  @MinLength(6, { message: 'A senha deve possui pelo menos 6 caracteres' })
  senha: string;
}
