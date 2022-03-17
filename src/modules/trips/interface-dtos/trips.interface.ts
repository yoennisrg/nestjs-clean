import { ModelBase } from '../../../infrastructure/interface-adapters/interfaces/model.base.interface';

export interface StartDTO {
  time: number;
  lat: number;
  lon: number;
  address?: string;
}

export interface EndDTO {
  time: number;
  lat: number;
  lon: number;
  address?: string;
}

export interface CoordinatesDTO {
  lat: number;
  lon: number;
}

export interface TripDTO {
  start: StartDTO;
  end: EndDTO;
  distance: number;
  duration: number;
  overspeedsCount: number;
  boundingBox: CoordinatesDTO[];
}
