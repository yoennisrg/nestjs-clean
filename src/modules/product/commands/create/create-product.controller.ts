import { Body, Controller, HttpStatus, Post } from '@nestjs/common';

import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateProductRequest } from '../../interface-dtos/create-product.request.dto';
import { IdResponse } from '../../interface-dtos/product.response.dto';
import { CreateProductCommand } from './create-product.command';
import { CreateProductService } from './create-product.service';

@Controller('product')
export class CreateProductController {
  constructor(private readonly service: CreateProductService) {}

  @Post('/')
  @ApiOperation({ summary: 'Create a product' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Product already exists',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
  })
  async create(@Body() req: CreateProductRequest): Promise<IdResponse> {
    return new IdResponse(
      await this.service.execute(new CreateProductCommand(req)),
    );
  }
}
