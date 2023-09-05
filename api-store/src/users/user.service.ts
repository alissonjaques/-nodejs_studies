import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { ListUserDTO } from './dto/ListUserDTO.dto';
import { UpdateUserDTO } from './dto/UpdateUserDTO.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async list() {
    const users = await this.userRepository.find();
    const listUsers = users.map((user) => new ListUserDTO(user));
    return listUsers;
  }

  async create(userEntity: UserEntity) {
    await this.userRepository.save(userEntity);
  }

  async update(id: number, userEntity: UpdateUserDTO) {
    const possibleUser = await this.userRepository.findOne({ where: { id } });

    if (!possibleUser) {
      throw new Error('Usuário não existe');
    }

    await this.userRepository.update(id, userEntity);
  }

  async delete(id: number) {
    const possibleUser = await this.userRepository.findOne({ where: { id } });

    if (!possibleUser) {
      throw new Error('Usuário não existe');
    }

    await this.userRepository.delete(id);
  }
}
