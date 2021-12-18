import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EntityBase } from '../../../infrastructure/database/base.model';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

class Attributes {
  @Prop()
  size: string;
  @Prop()
  type: string;
  @Prop()
  color: string;
  @Prop()
  gender: string;
}

@Schema()
export class Product extends EntityBase {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  attributes: Attributes;

  @Prop({ default: false })
  stock: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
