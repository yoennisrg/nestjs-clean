import { Body, Controller, HttpStatus, Post } from '@nestjs/common';

import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadingList } from '../../interface-dtos/create-trips.request.dto';
import { Trip } from '../../interface-dtos/trips.response.dto';
import { CreateTripsCommand } from './create-trips.command';
import { CreateTripsService } from './create-trips.service';

@Controller('trips')
export class CreateTripsController {
  constructor(private readonly service: CreateTripsService) {}

  @Post('/')
  @ApiOperation({ summary: 'Create a Trips' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Trip,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Trips already exists',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
  })
  async create(@Body() req: ReadingList): Promise<Trip> {
    return await this.service.execute(new CreateTripsCommand(req));
  }
}
