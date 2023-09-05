import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/CreateUserDTO.dto';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDTO } from './dto/UpdateUserDTO.dto';
import { UserService } from './user.service';

@Controller('/usuarios')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDTO: CreateUserDTO) {
    const userEntity = new UserEntity();
    userEntity.name = createUserDTO.name;
    userEntity.email = createUserDTO.email;
    userEntity.password = createUserDTO.password;

    await this.userService.create(userEntity);
  }

  @Put('/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDTO: UpdateUserDTO,
  ) {
    await this.userService.update(id, updateUserDTO);
  }

  @Get()
  async listUser() {
    return await this.userService.list();
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: number) {
    await this.userService.delete(id);
  }
}
