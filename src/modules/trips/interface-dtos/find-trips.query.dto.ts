import { PaginationDto } from '../../../infrastructure/utils/mongoose-paginate';
import { FindTrips } from './find-trips.interface';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindTripsQuery extends PaginationDto implements FindTrips {
  constructor(props: any) {
    super(props);
  }

  @ApiProperty({
    example: 'start_gte',
    description: 'down filter for the trip start',
  })
  @IsNumber()
  readonly start_gte: number;

  @ApiProperty({
    example: 'start_lte',
    description: 'up filter for the trip start',
  })
  @IsNumber()
  readonly start_lte: number;

  @ApiProperty({
    example: 'Default value : 0.5',
    description: 'down filter for the trip distance',
  })
  @IsNumber()
  readonly distance_gte: number;

  @ApiProperty({
    example: 'Default value : 20',
    description: 'Number of trips to retrieve',
  })
  @IsNumber()
  readonly limit: number;
  @ApiProperty({
    example: 'Default value : 0',
    description: 'Offset of trips to retrieve',
  })
  @IsNumber()
  readonly offset: number;
}
