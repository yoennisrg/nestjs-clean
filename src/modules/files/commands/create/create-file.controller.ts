import {
  Body,
  Controller,
  HttpStatus,
  Logger,
  Post,
  ConflictException,
} from '@nestjs/common';

import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateFileRequest } from '../../interface-dto/create-file.request.dto';
import { IdResponse } from '../../../../infrastructure/interface-adapters/dtos/id.response.dto';
import { CreateFileCommand } from './create-file.command';
import { CreateFileService } from './create-file.service';
import { v4 as uuidv4 } from 'uuid';

@Controller('files')
export class CreateFileController {
  constructor(private readonly service: CreateFileService) {}

  @Post('/')
  @ApiOperation({ summary: 'Create a file' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'File already exists',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
  })
  async create(@Body() req: CreateFileRequest): Promise<void> {
    Logger.debug('creating file', req);
  }
}
