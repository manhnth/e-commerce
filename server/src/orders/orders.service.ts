import { Product } from './../typeorm/product.entity';
import { User } from 'src/typeorm/user.entity';
import { CreateOrderItemsDto } from './dto/create-order-items.dto';
import { OrderItem } from '../typeorm/order-item.entity';
import { CreateOrderDto } from './dto/create-order-dto';
import { Order } from './../typeorm/order.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemsRepository: Repository<OrderItem>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async createOrder(
    createOrderDto: CreateOrderDto,
    cartItemList: CreateOrderItemsDto[],
    user: User,
  ) {
    const order = this.ordersRepository.create(createOrderDto);
    const dbProducts = await this.productsRepository.find();
    console.log(dbProducts);

    let total = 0;
    const orderItemsList: OrderItem[] = [];
    const productId: number[] = [];

    cartItemList.map((item) => {
      const orderItem = new OrderItem();
      orderItem.name = item.name;
      orderItem.quantity = item.quantity;

      // relationship between order-item and product: one to one
      const product = dbProducts.find((p) => p.id === item.id);
      console.log(product);

      product && (orderItem.product = product);

      productId.push(orderItem.id);
      total = total + item.price;

      orderItemsList.push(orderItem);
    });

    const orderItemsEntities = this.orderItemsRepository.create(orderItemsList);
    await this.orderItemsRepository.insert(orderItemsEntities);

    // relationship between order-item and order: many to one
    order.orderItems = orderItemsList;

    order.user = user;
    order.total = total;

    return await this.ordersRepository.save(order);
  }

  async getAllOrders() {
    return await this.ordersRepository.find();
  }

  async getOrderByUserId(userId: number) {
    const orders = await this.ordersRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.orderItems', 'orderItems')
      .where('user.id=:id', { id: userId })
      .getMany();

    return orders;
  }

  async getOrderById(orderId: number) {
    const order = await this.ordersRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.orderItems', 'orderItems')
      .leftJoinAndSelect('orderItem.product', 'product')
      .where('order.id=:id', { id: orderId })
      .getOne();
    return order;
  }

  async confirmStatus(orderId: number) {
    return await this.ordersRepository.update(
      { id: orderId },
      { status: true },
    );
  }
}
