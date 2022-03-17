import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EntityBase } from '../../../infrastructure/database/base.model';
import { Document } from 'mongoose';

export type TripsDocument = Trips & Document;

class Start {
  @Prop()
  time: number;
  @Prop()
  lat: number;
  @Prop()
  lon: number;
  @Prop()
  address: string;
}

class End {
  @Prop()
  time: number;
  @Prop()
  lat: number;
  @Prop()
  lon: number;
  @Prop()
  address: string;
}

class Coordinates {
  @Prop()
  lat: number;
  @Prop()
  lon: number;
}

@Schema()
export class Trips extends EntityBase {
  @Prop()
  start: Start;
  @Prop()
  end: End;
  @Prop()
  distance: number;
  @Prop()
  duration: number;
  @Prop()
  overspeedsCount: number;
  @Prop()
  boundingBox: Coordinates[];
}

export const TripsSchema = SchemaFactory.createForClass(Trips);
