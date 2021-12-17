import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EntityBase } from '../../../infrastructure/database/base.entity';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product extends EntityBase {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
