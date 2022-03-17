import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { Trips, TripsSchema } from './database/trips.entity';
import { TripsRepoProvider } from './database/trips.provider';

import { CreateTripsController } from './commands/create/create-trips.controller';
import { CreateTripsService } from './commands/create/create-trips.service';
import { FindTripsController } from './queries/find-trips/find-trips.controller';
import { FindTripsService } from './queries/find-trips/find-trips.service';

const httpControllers = [CreateTripsController, FindTripsController];
const dependencesControllers = [CreateTripsService, FindTripsService];

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Trips.name, schema: TripsSchema }]),
    HttpModule,
  ],
  controllers: [...httpControllers],
  providers: [...dependencesControllers, TripsRepoProvider],
})
export class TripsModule {}
