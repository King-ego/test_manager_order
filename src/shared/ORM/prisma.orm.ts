import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../../prisma/generated/mysql/client';
import {SystemLogs} from "../logsSystem/system.logs";

@Injectable()
export class PrismaOrm extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    SystemLogs('[STARTUP] Connecting to the database...');
    await this.$connect();
  }
}
