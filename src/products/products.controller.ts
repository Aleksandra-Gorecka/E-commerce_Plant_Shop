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
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminAuthGuard } from 'src/auth/admin-auth.guard';
import { CreateProductDTO } from './dtos/create-product.dto';
import { UpdateProductDTO } from './dtos/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('/')
  getAll(): any {
    return this.productsService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const product = await this.productsService.getById(id);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  @Get('/search/:searchPhrase')
  async searchProducts(@Param('searchPhrase') searchPhrase: string) {
    return this.productsService.searchProducts(searchPhrase);
  }

  @Post('/')
  @UseGuards(AdminAuthGuard)
  @UseGuards(JwtAuthGuard)
  async createProduct(@Body() productData: CreateProductDTO) {
    return this.productsService.createProduct(productData);
  }

  @Put('/:id')
  @UseGuards(AdminAuthGuard)
  @UseGuards(JwtAuthGuard)
  async updateProduct(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() productData: UpdateProductDTO,
  ) {
    if (!(await this.productsService.getById(id)))
      throw new NotFoundException('Product not found');
    return this.productsService.updateProduct(id, productData);
  }

  @Delete('/:id')
  @UseGuards(AdminAuthGuard)
  @UseGuards(JwtAuthGuard)
  async deleteProduct(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.productsService.getById(id)))
      throw new NotFoundException('Product not found');
    await this.productsService.deleteProduct(id);
    return { success: true };
  }
}
