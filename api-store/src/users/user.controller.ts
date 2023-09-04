import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/CreateUserDTO.dto';
import { UserEntity } from './user.entity';
import { UpdateUserDTO } from './dto/UpdateUserDTO.dto';

@Controller('/usuarios')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Post()
  async createUser(@Body() createUserDTO: CreateUserDTO) {
    const userEntity = new UserEntity(createUserDTO);
    await this.userRepository.save(userEntity);
  }

  @Put('/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDTO: UpdateUserDTO,
  ) {
    const user = await this.userRepository.update(id, updateUserDTO);

    return {
      user: user,
      message: 'Usuário atualizado com sucesso',
    };
  }

  @Get()
  async listUser() {
    return await this.userRepository.list();
  }
}
