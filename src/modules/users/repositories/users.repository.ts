import { Injectable } from '@nestjs/common';
import {PrismaClient, Prisma, User} from '../../../../prisma/generated/mysql/client';

@Injectable()
export class UsersRepository {
  private readonly client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }

  public async createUser(data: Prisma.UserCreateInput, prisma?: Prisma.TransactionClient): Promise<User> {
      const orm = prisma || this.client;
      return orm.user.create({ data });
  }
}
