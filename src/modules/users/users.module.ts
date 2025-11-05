import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { CreateUserService } from './services/create-user.service';
import { UsersRepository } from './repositories/users.repository';

@Module({
  controllers: [UsersController],
  providers: [CreateUserService, UsersRepository],
  exports: [UsersRepository],
})
export class UsersModule {}
