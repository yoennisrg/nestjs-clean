import { Prop, Schema } from '@nestjs/mongoose';
import { ModelBase } from '../interface-adapters/interfaces/model.base.interface';
@Schema()
export class EntityBase {
  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ default: Date.now() })
  updatedAt: Date;
}
