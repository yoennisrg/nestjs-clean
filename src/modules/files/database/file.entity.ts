import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EntityBase } from '../../../infrastructure/database/base.model';
import { Document } from 'mongoose';

export type FileDocument = File & Document;

@Schema()
export class File extends EntityBase {
  @Prop()
  ean: string;

  @Prop()
  cku: string;

  @Prop()
  price: number;

  @Prop({ default: false })
  stock: boolean;
}

export const FileSchema = SchemaFactory.createForClass(File);
