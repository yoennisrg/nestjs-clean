import { Trips } from './trips.entity';
import { BaseRepositoryPort } from '../../../infrastructure/ports/repository.port';

export interface TripsRepositoryPort extends BaseRepositoryPort {
  create(command: unknown): Promise<Trips>;
  exists(fitler: unknown): Promise<boolean>;
  filter(query: unknown): Promise<Trips[]>;
  paginate(query: unknown): Promise<Trips[]>;
}
