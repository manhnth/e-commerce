import { CreateOrderItemsDto } from '../orders/dto/create-order-items.dto';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import {
  Body,
  CACHE_MANAGER,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  @Get()
  async getCart(@Req() req: any) {
    const { userId } = req.user;

    const result = await this.cacheManager.get(userId);

    return result;
  }

  @Post()
  async setCart(@Req() req: any, @Body() cartItems: CreateOrderItemsDto[]) {
    const { userId } = req.user;

    await this.cacheManager.set(userId, cartItems);
  }
}
