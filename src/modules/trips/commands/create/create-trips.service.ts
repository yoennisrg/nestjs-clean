import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { HttpService } from '@nestjs/axios';
import { CreateTripsCommand } from './create-trips.command';
import { Trip } from '../../interface-dtos/trips.response.dto';
import { TripsRepositoryPort } from '../../database/trips.repository.port';
@CommandHandler(CreateTripsCommand)
export class CreateTripsService {
  constructor(
    @Inject('TripsRepo')
    private readonly tripsRepo: TripsRepositoryPort,
    private httpService: HttpService,
  ) {}

  async getAddressLocation({ lat, lon }: any) {
    const geocode = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=03c48dae07364cabb7f121d8c1519492&no_annotations=1&language=en`;
    const data = await (await this.httpService.get(geocode).toPromise()).data;
    return data.results[0].formatted;
  }

  async execute(command: CreateTripsCommand): Promise<Trip> {
    const { start, end, ...restProps } = command;
    start['address'] = await this.getAddressLocation(start);
    end['address'] = await this.getAddressLocation(end);

    return await this.tripsRepo.create({
      start,
      end,
      ...restProps,
    });
  }
}
