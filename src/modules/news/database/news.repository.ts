import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  BaseRepository,
  DeleteResult,
} from '../../../infrastructure/database/base.repository';
import { QueryOptions } from '../../../infrastructure/interface-adapters/dtos/query.options.dto';
import { News, NewsDocument } from '../database/news.entity';

@Injectable()
export class NewsRepository extends BaseRepository<NewsDocument> {
  constructor(
    @InjectModel(News.name)
    private readonly newsModel: Model<NewsDocument>,
  ) {
    super(newsModel);
  }

  async filter(query: QueryOptions): Promise<unknown> {
    const options = query.filters;
    if ({ ...query.filters }.hasOwnProperty('_tags')) {
      options.tags = { $all: [options['_tags']] };
    }

    const result = await this.newsModel
      .find(options)
      .skip(Number(query.pagination.skip || 0))
      .limit(Number(query.pagination.limit || 10))
      .exec();

    return { items: result, total: result.length };
  }

  async create(news: News): Promise<number> {
    const { _id } = await this.save(news);
    return _id;
  }

  async exists(filters: unknown): Promise<boolean> {
    return Boolean(await this.findOne(filters));
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.deleteOne({ _id: new Types.ObjectId(id) });
  }
}
