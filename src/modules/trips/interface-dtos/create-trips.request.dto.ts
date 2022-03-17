import {
  ReadingListDTO,
  LocationDTO,
  ReadingDTO,
} from './create-trips.interface';
import {
  IsNumber,
  IsArray,
  IsObject,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class Location implements LocationDTO {
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

class Reading implements ReadingDTO {
  @ApiProperty({
    description: 'timestamp of the reading',
  })
  @IsNumber()
  readonly time: number;

  @ApiProperty({
    description: 'speed of the reading',
  })
  @IsNumber()
  readonly speed: number;
  @IsNumber()
  @ApiProperty({
    description: 'speed limit for the reading location',
  })
  readonly speedLimit: number;

  @ApiProperty({
    description: 'latitude and longitude of the reading',
  })
  @IsObject()
  @ValidateNested()
  @Type(() => Location)
  readonly location: Location;
}

export class ReadingList implements ReadingListDTO {
  @ApiProperty({
    type: [Reading],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(5)
  @Type(() => Reading)
  readonly readings: Reading[];
}
