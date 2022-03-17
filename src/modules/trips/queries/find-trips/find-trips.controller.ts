import { Controller, HttpStatus, Get, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FindTripsQuery } from '../../interface-dtos/find-trips.query.dto';
import { FindTripsService } from './find-trips.service';

@Controller('trips')
export class FindTripsController {
  constructor(private readonly service: FindTripsService) {}

  @Get('/')
  @ApiOperation({ summary: 'Find Trips' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: '',
  })
  async findTrips(@Req() request: FindTripsQuery): Promise<unknown> {
    return await this.service.execute(request);
  }
}
