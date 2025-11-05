import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../../prisma/generated/mysql/client';

@Injectable()
export class PrismaOrm extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    console.log('[STARTUP] Connecting to the database...');
    await this.$connect();
  }
}
