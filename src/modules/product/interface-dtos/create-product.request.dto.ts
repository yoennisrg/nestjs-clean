import {
  IsNumber,
  IsBoolean,
  IsString,
  ValidateNested,
  IsObject,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CreateProduct, Attributes } from './create-product.interface';

class AttributesProducts implements Attributes {
  @IsString({ message: 'must be a string' })
  readonly size: string;

  @IsString()
  readonly type: string;

  @IsString()
  readonly color: string;

  @IsString()
  readonly gender: string;
}

class AttributesProduct implements Attributes {
  @IsString({ message: 'must be a string' })
  readonly size: string;

  @IsString()
  readonly type: string;

  @IsString()
  readonly color: string;

  @IsString()
  readonly gender: string;

  @IsObject()
  @ValidateNested()
  @Type(() => AttributesProducts)
  readonly attribute!: AttributesProducts;
}

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
  @ValidateNested()
  @Type(() => AttributesProduct)
  readonly attributes!: AttributesProduct;

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
  @IsOptional()
  readonly stock?: boolean;
}
