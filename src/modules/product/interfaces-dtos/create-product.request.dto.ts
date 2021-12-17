import { IsNumber, IsBoolean, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CreateProduct, AttributesProduct } from './create-product.interface';

class Attributes implements AttributesProduct {
  @IsString()
  readonly size?: string;

  @IsString()
  readonly type?: string;

  @IsString()
  readonly color?: string;

  @IsString()
  readonly gender?: string;
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
  @ValidateNested()
  @Type(() => Attributes)
  readonly attributes: Attributes;

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
  readonly stock?: boolean;
}
