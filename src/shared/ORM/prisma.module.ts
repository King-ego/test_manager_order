import { Module } from '@nestjs/common';
import { PrismaOrm } from './prisma.orm';

@Module({
  providers: [PrismaOrm],
})
export class PrismaModule {}
