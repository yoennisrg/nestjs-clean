import {
  IsNumber,
  IsBoolean,
  IsString,
  ValidateNested,
  IsObject,
  ValidateIf,
  IsOptional,
  isString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsRequiredIfMatch } from '../../../infrastructure/decorator';

class AttributesProducts {
  // @IsCompatibleWithValue('file_type', ['json'])
  // readonly description: string;

  @IsString()
  readonly gender: string;
}

export class CreateFileRequest {
  @IsString()
  @IsIn(['csv', 'json'])
  readonly file_type: string;

  @IsString()
  readonly name: string;

  @IsRequiredIfMatch('file_type', ['json'])
  @ValidateNested()
  @Type(() => AttributesProducts)
  readonly config!: AttributesProducts;
}
