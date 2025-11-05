import { Injectable } from '@nestjs/common';
import {PrismaClient, Prisma, User} from '../../../../prisma/generated/mysql/client';

@Injectable()
export class UsersRepository {
  private client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }

  public async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.client.user.create({ data });
  }
}
