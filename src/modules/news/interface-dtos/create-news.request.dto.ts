import { News, highlightResult, Result } from './create-news.interface';
import {
  IsNumber,
  IsBoolean,
  IsArray,
  IsString,
  ValidateNested,
  IsObject,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class AttributesHighlightResult implements highlightResult {
  readonly author: Result;
  readonly commentText: Result;
  readonly storyUitle: Result;
  readonly storyUrl: Result;
}

export class CreateNewsRequest implements News {
  @IsString()
  readonly title: string;
  @IsString()
  readonly url: string;
  @IsString()
  readonly author: string;
  @IsString()
  readonly points: string;
  @IsString()
  readonly storyText: string;
  @IsString()
  readonly commentText: string;
  @IsString()
  readonly numComments: number;
  @IsNumber()
  readonly storyId: number;
  @IsString()
  readonly storyTitle: string;
  @IsString()
  readonly storyUrl: string;
  @IsNumber()
  readonly parentId: number;
  @IsNumber()
  readonly createdAtI: number;
  @IsArray()
  readonly tags: string[];
  @IsNumber()
  readonly objectID: number;
  @IsObject()
  @ValidateNested()
  @Type(() => AttributesHighlightResult)
  readonly attributes!: AttributesHighlightResult;
  readonly highlightResult: AttributesHighlightResult;
}
