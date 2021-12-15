import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class EntityBase {
  @Prop()
  createdBy: number;
}
