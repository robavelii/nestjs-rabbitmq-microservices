import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}
  async createOrder(request: CreateOrderDto) {
    return this.ordersRepository.create(request);
  }
  async getOrders() {
    return this.ordersRepository.find({});
  }
}
