import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];

  async save(user: UserEntity) {
    this.users.push(user);
  }

  async update(id: number, partialEntity: Partial<UserEntity>) {
    const possibleUser = this.users.find((user) => user.id === id);

    if (!possibleUser) {
      throw new Error('Usuário não existe');
    }

    Object.entries(partialEntity).forEach(([key, value]) => {
      if (key === 'id') {
        return;
      }

      possibleUser[key] = value;
    });

    return possibleUser;
  }

  async list() {
    return this.users;
  }

  async existsWithEmail(email: string) {
    const possibleUser = this.users.find((user) => user.email == email);
    return possibleUser != undefined;
  }
}
