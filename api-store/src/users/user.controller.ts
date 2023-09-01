import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Controller('/usuarios')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Post()
  async createUser(@Body() userData) {
    await this.userRepository.save(userData);
  }

  @Get()
  async listUser() {
    return await this.userRepository.list();
  }
}
