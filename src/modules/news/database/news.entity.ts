import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EntityBase } from '../../../infrastructure/database/base.model';
import { Document } from 'mongoose';

export type NewsDocument = News & Document;

class Result {
  @Prop()
  value?: string;
  @Prop()
  matchLevel?: string;
  @Prop()
  fullyHighlighted?: boolean;
  @Prop()
  matchedWords?: string[];
}

class highlightResult {
  @Prop()
  author: Result;
  @Prop()
  commentText: Result;
  @Prop()
  story_title: Result;
  @Prop()
  story_url: Result;
}

@Schema()
export class News extends EntityBase {
  @Prop()
  title: string;
  @Prop()
  url: string;
  @Prop()
  author: string;
  @Prop()
  points: string;
  @Prop()
  storyText: string;
  @Prop()
  commentText: string;
  @Prop()
  numComments: number;
  @Prop()
  storyId: number;
  @Prop()
  storyTitle: string;
  @Prop()
  storyUrl: string;
  @Prop()
  parentId: number;
  @Prop()
  createdAtI: number;
  @Prop()
  tags: string[];
  @Prop()
  objectID: number;
  @Prop()
  highlightResult: highlightResult;
}

export const NewsSchema = SchemaFactory.createForClass(News);
