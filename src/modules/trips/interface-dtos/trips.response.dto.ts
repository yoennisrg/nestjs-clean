import {
  TripDTO,
  StartDTO,
  EndDTO,
  CoordinatesDTO,
} from '../interface-dtos/trips.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsArray, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class Start implements StartDTO {
  @ApiProperty({
    description: 'timestamp of the reading',
  })
  @IsNumber()
  readonly time: number;

  @ApiProperty({
    description: 'latitude of the reading',
  })
  @IsNumber()
  readonly lat: number;

  @ApiProperty({
    description: 'longitude of the reading',
  })
  @IsNumber()
  readonly lon: number;
}

class End implements EndDTO {
  @ApiProperty({
    description: 'timestamp of the reading',
  })
  @IsNumber()
  readonly time: number;

  @ApiProperty({
    description: 'latitude of the reading',
  })
  @IsNumber()
  readonly lat: number;

  @ApiProperty({
    description: 'longitude of the reading',
  })
  @IsNumber()
  readonly lon: number;
}

export class Coordinates implements CoordinatesDTO {
  @ApiProperty({
    description: 'latitude of the reading',
  })
  @IsNumber()
  readonly lat: number;

  @ApiProperty({
    description: 'longitude of the reading',
  })
  @IsNumber()
  readonly lon: number;
}

export class Trip implements TripDTO {
  @ApiProperty({
    description: 'trip start data',
  })
  @IsObject()
  @ValidateNested()
  @Type(() => Start)
  readonly start: Start;

  @ApiProperty({
    description: 'trip end data',
  })
  @IsObject()
  @ValidateNested()
  @Type(() => End)
  readonly end: End;

  @ApiProperty({
    description: 'distance of the trip in kilometers',
  })
  @IsNumber()
  readonly distance: number;
  @IsNumber()
  @ApiProperty({
    description: 'duration of the trips in milliseconds',
  })
  readonly duration: number;
  @IsNumber()
  @ApiProperty({
    description: 'count of overspeeds in the trip',
  })
  readonly overspeedsCount: number;

  @ApiProperty({
    description: 'the bounding box of the trip',
    type: Coordinates,
    isArray: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Coordinates)
  readonly boundingBox: Coordinates[];
}
