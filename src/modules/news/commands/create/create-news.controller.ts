import { Body, Controller, HttpStatus, Post } from '@nestjs/common';

import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateNewsRequest } from '../../interface-dtos/create-news.request.dto';
import { IdResponse } from '../../../../infrastructure/interface-adapters/dtos/id.response.dto';
import { CreateNewsCommand } from './create-news.command';
import { CreateNewsService } from './create-news.service';

@Controller('news')
export class CreateNewsController {
  constructor(private readonly service: CreateNewsService) {}

  @Post('/')
  @ApiOperation({ summary: 'Create a news' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'News already exists',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
  })
  async create(@Body() req: CreateNewsRequest): Promise<IdResponse> {
    return new IdResponse(
      await this.service.execute(new CreateNewsCommand(req)),
    );
  }
}
