import { CreateOrderItemsDto } from './dto/create-order-items.dto';
import { UsersService } from './../users/users.service';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { CreateOrderDto } from './dto/create-order-dto';
import { OrdersService } from './orders.service';
import {
  BadRequestException,
  Body,
  CACHE_MANAGER,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Cache } from 'cache-manager';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(
    private ordersService: OrdersService,
    private userService: UsersService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Post('create')
  async createOrder(@Req() req: any, @Body() createOrderDto: CreateOrderDto) {
    const { userId } = req.user;
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new BadRequestException('something went wrong');
    }
    const orderItems: CreateOrderItemsDto[] | undefined =
      await this.cacheManager.get(userId);

    if (!orderItems) {
      throw new BadRequestException('Not items provided');
    }
    return await this.ordersService.createOrder(
      createOrderDto,
      orderItems,
      user,
    );
  }

  @Get('all')
  async getAllOrders() {
    return await this.ordersService.getAllOrders();
  }

  @Get('myOrders')
  async getOrdersByUser(@Req() req: any) {
    const { userId } = req.user;

    return await this.ordersService.getOrderByUserId(userId);
  }

  @Get(':id')
  async getOrderById(@Param('id') id: number) {
    return await this.ordersService.getOrderById(id);
  }

  @Patch(':id')
  async confirmStatus(@Param('id') id: number) {
    return await this.ordersService.confirmStatus(id);
  }
}
