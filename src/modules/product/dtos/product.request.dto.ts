import { IsNumber, IsBoolean, IsString, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  CreateProduct,
  AttributeProduct,
} from '../interface/product.interface';

export class CreateProductRequest implements CreateProduct {
  @ApiProperty({
    example: 'Nike Air Max 90 Premium',
    description: 'Product name',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    example:
      'Product that brings a new twist to the original waffle sole, while maintaining the stitched overlays and classic molded details',
    description: 'Product description',
  })
  @IsString()
  readonly description: string;

  @ApiProperty({
    example:
      'The attributes define the characteristics of the product, object example: type, size, color, etc ...',
    description: 'Product attributes',
  })
  @IsObject()
  readonly attributes: AttributeProduct;

  @ApiProperty({
    example: '99.9',
    description: 'Product price',
  })
  @IsNumber()
  readonly price: number;

  @ApiProperty({
    example: 'true',
    description: 'Assign if the product is in stock, this property is optional',
  })
  @IsBoolean()
  readonly stock: boolean;
}