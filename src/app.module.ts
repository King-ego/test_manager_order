import { Module } from '@nestjs/common';
import { OrdersModule } from './modules/orders/orders.module';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { PrismaModule } from './shared/ORM/prisma.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [PrismaModule, OrdersModule, UsersModule, ProductsModule, AuthModule],
})
export class AppModule {}
