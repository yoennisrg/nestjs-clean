import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  BaseRepository,
  DeleteResult,
} from '../../../infrastructure/database/base.repository';
import { QueryOptions } from '../../../infrastructure/interface-adapters/dtos/query.options.dto';
import { Trips, TripsDocument } from '../database/trips.entity';
import {
  paginateModel,
  PaginationDto,
} from '../../../infrastructure/utils/mongoose-paginate';

@Injectable()
export class TripsRepository extends BaseRepository<TripsDocument> {
  constructor(
    @InjectModel(Trips.name)
    private readonly tripsModel: Model<TripsDocument>,
  ) {
    super(tripsModel);
  }

  async filter(query: QueryOptions): Promise<unknown> {
    const options = query.filters;
    if ({ ...query.filters }.hasOwnProperty('_tags')) {
      options.tags = { $all: [options['_tags']] };
    }

    const result = await this.tripsModel
      .find(options)
      .skip(Number(query.pagination.skip || 0))
      .limit(Number(query.pagination.limit || 10))
      .exec();

    return { items: result, total: result.length };
  }

  async paginate(params: PaginationDto): Promise<unknown> {
    return await paginateModel(this.tripsModel)(params.query, params.options);
  }

  async create(trips: unknown): Promise<Trips> {
    return await this.save(trips);
  }

  async exists(filters: unknown): Promise<boolean> {
    return Boolean(await this.findOne(filters));
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.deleteOne({ _id: new Types.ObjectId(id) });
  }
}
