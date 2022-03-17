import { Provider } from '@nestjs/common';
import { TripsRepository } from './trips.repository';

export const TripsRepoProvider: Provider = {
  provide: 'TripsRepo',
  useClass: TripsRepository,
};
