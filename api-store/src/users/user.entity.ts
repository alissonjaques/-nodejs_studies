import { CreateUserDTO } from './dto/CreateUserDTO.dto';

export class UserEntity {
  id: number;
  name: string;
  email: string;
  password: string;
  static counter: number = 0;

  constructor(createUserDTO: CreateUserDTO) {
    UserEntity.counter = UserEntity.counter + 1;
    this.id = UserEntity.counter;
    this.name = createUserDTO.name;
    this.email = createUserDTO.email;
    this.password = createUserDTO.password;
  }
}
