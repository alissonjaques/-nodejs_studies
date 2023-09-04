import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/CreateUserDTO.dto';
import { UserEntity } from './user.entity';

@Controller('/usuarios')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Post()
  async createUser(@Body() createUserDTO: CreateUserDTO) {
    const userEntity = new UserEntity(createUserDTO);
    await this.userRepository.save(userEntity);
  }

  @Get()
  async listUser() {
    return await this.userRepository.list();
  }
}
