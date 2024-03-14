import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  NotFoundException,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderDTO } from './dtos/create-order.dto';
import { CartProduct } from '@prisma/client';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get('/')
  getAll(): any {
    return this.ordersService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const order = await this.ordersService.getById(id);
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  @Post('/')
  async createOrder(@Body() orderData: OrderDTO) {
    console.log(orderData);
    try {
      const cartProducts: Omit<CartProduct, 'id'>[] = orderData.cartProducts;
      return this.ordersService.createOrder(orderData, cartProducts);
    } catch (error) {
      throw error;
    }
  }
}
