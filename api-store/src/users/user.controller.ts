import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/CreateUserDTO.dto';

@Controller('/usuarios')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Post()
  async createUser(@Body() createUserDTO: CreateUserDTO) {
    await this.userRepository.save(createUserDTO);
  }

  @Get()
  async listUser() {
    return await this.userRepository.list();
  }
}
