import {
  TripDTO,
  StartDTO,
  EndDTO,
  CoordinatesDTO,
} from '../../interface-dtos/trips.interface';
import { ReadingList } from '../../interface-dtos/create-trips.request.dto';

class StartCommand implements StartDTO {
  constructor(start: StartCommand) {
    console.log(start);
  }

  readonly time: number;
  readonly lat: number;
  readonly lon: number;
}

class EndCommand implements EndDTO {
  constructor(end: EndCommand) {
    console.log(end);
  }

  readonly time: number;
  readonly lat: number;
  readonly lon: number;
}

class CoordinatesCommand implements CoordinatesDTO {
  constructor(coordinates: CoordinatesCommand) {
    console.log(coordinates);
  }

  readonly lat: number;
  readonly lon: number;
}

export class CreateTripsCommand implements TripDTO {
  constructor({ readings }: ReadingList) {
    // console.log('CreateTripsCommand', readings);
    const first = readings.at(0);
    const latest = readings.at(-1);

    this.start = {
      time: first.time,
      ...first.location,
    };
    this.end = {
      time: latest.time,
      ...latest.location,
    };

    this.duration = latest.time - first.time;
    this.distance = 0;
    this.overspeedsCount = 0;
    this.boundingBox = [];
  }

  readonly start: StartCommand;
  readonly end: EndCommand;
  readonly distance: number;
  readonly duration: number;
  readonly overspeedsCount: number;
  readonly boundingBox: CoordinatesCommand[];
}
