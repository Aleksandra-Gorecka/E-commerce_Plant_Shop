import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseUUIDPipe,
  NotFoundException,
  UseGuards,
  ConflictException,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderDTO } from './dtos/create-order.dto';
import { CartProduct } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminAuthGuard } from 'src/auth/admin-auth.guard';

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

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminAuthGuard)
  async updateOrder(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() orderData: OrderDTO,
  ) {
    if (!(await this.ordersService.getById(id)))
      throw new NotFoundException('Order not found');
    try {
      return this.ordersService.updateOrder(id, orderData);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Order not found');
      }
      if (error instanceof ConflictException) {
        throw new ConflictException('Order with the same ID already exists');
      }
      throw error;
    }
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminAuthGuard)
  async deleteOrder(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.ordersService.getById(id)))
      throw new NotFoundException('Order not found');
    return this.ordersService.deleteOrder(id);
  }
}
