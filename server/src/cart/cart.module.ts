import { UsersModule } from './../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './../auth/strategies/jwt.strategy';
import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { User } from 'src/typeorm/user.entity';
@Module({
  imports: [
    // CacheModule.register(),
    UsersModule,
  ],
  controllers: [CartController],
  providers: [JwtStrategy],
  exports: [],
})
export class CartModule {}
