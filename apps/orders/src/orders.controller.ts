import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() request: CreateOrderDto, @Req() req: any) {
    return this.ordersService.createOrder(request);
  }
  @Get()
  async getOrders() {
    return this.ordersService.getOrders();
  }
}
