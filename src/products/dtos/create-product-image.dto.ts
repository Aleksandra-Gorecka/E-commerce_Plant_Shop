import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductImageDTO {
  @IsNotEmpty()
  @IsString()
  image: string;
}
