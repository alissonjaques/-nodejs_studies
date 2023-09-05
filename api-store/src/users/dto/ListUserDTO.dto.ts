import { UserEntity } from '../entities/user.entity';

export class ListUserDTO {
  name: string;
  email: string;

  constructor(userEntity: UserEntity) {
    this.name = userEntity.name;
    this.email = userEntity.email;
  }
}
