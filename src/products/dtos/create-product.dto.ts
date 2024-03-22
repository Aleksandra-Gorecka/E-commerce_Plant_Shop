import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { CreateProductImageDTO } from './create-product-image.dto';

export class CreateProductDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsArray()
  @ValidateNested({ each: true })
  gallery: CreateProductImageDTO[];
}
