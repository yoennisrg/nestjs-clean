import { Controller, HttpStatus, Get, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FindNewsQuery } from '../../interface-dtos/find-news.query.dto';
import { FindNewsService } from './find-news.service';
// import { FindNewsRequest } from '../../interface-dtos/find-news.request.dto';
// import { NewsResponse } from '../../interface-dtos/news.response.dto';

@Controller('news')
export class FindNewsController {
  constructor(private readonly service: FindNewsService) {}

  @Get('/')
  @ApiOperation({ summary: 'Find news' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: '',
  })
  async findNews(@Req() request): Promise<unknown> {
    return await this.service.execute(new FindNewsQuery(request));
  }
}
