import { Inject } from '@nestjs/common';
import { TripsRepositoryPort } from '../../database/trips.repository.port';
import { FindTripsQuery } from '../../interface-dtos/find-trips.query.dto';

export class FindTripsService {
  constructor(
    @Inject('TripsRepo')
    private readonly TripsRepo: TripsRepositoryPort,
  ) {}

  async execute(query: FindTripsQuery): Promise<unknown> {
    return await this.TripsRepo.paginate(query);
  }
}
