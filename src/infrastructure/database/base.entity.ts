import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class EntityBase {
  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ default: Date.now() })
  updatedAt: Date;
}
