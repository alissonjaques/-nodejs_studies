import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { EmailIsUniqueValidator } from './validators/email-is-unique.validator';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, Repository, EmailIsUniqueValidator],
})
export class UserModule {}
