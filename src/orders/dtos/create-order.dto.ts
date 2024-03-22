import {
  IsString,
  IsEmail,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  Min,
} from 'class-validator';

class CartProductDTO {
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @IsNotEmpty()
  @IsUUID()
  orderId: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsString()
  comment: string;
}

class OrderDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  phone: number;

  @IsNotEmpty()
  @IsString()
  shippingStreet: string;

  @IsNotEmpty()
  @IsString()
  shippingZip: string;

  @IsNotEmpty()
  @IsString()
  shippingCity: string;

  @IsNotEmpty()
  @IsString()
  paymentMethod: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  orderTotal: number;

  @IsNotEmpty()
  @IsArray()
  cartProducts: CartProductDTO[];
}

export { OrderDTO };
