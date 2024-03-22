import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderDTO } from './dtos/create-order.dto';
import { CartProduct } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  getAll(): any {
    return this.ordersService.getAll();
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const order = await this.ordersService.getById(id);
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  @Post('/')
  @UseGuards(JwtAuthGuard)
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
