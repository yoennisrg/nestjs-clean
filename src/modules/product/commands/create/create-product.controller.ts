import {
  Body,
  Controller,
  HttpStatus,
  Logger,
  Post,
  ConflictException,
} from '@nestjs/common';

import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateProductRequest } from '../../interface-dtos/create-product.request.dto';
import { IdResponse } from '../../../../infrastructure/interface-adapters/dtos/id.response.dto';
import { CreateProductCommand } from './create-product.command';
import { CreateProductService } from './create-product.service';
import { v4 as uuidv4 } from 'uuid';

@Controller('products')
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

  // async create(@Body() req: CreateProductRequest): Promise<IdResponse> {
  //   return new IdResponse(
  //     await this.service.execute(new CreateProductCommand(req)),
  //   );
  // }
  async create(@Body() req: any): Promise<any> {
    console.log(req);

    // if (req.refId == '1082048' && req.refId == '1096996') {
    //   throw new ConflictException(`Not proceesing ${req.refId}`);
    // }
    return Promise.resolve({ size: req.length, id: uuidv4() });
  }
}
