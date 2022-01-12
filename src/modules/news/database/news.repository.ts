import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '../../../infrastructure/database/base.repository';

import { News, NewsDocument } from '../database/news.entity';

@Injectable()
export class NewsRepository extends BaseRepository<NewsDocument> {
  constructor(
    @InjectModel(News.name)
    private readonly newsModel: Model<NewsDocument>,
  ) {
    super(newsModel);
  }

  async create(news: News): Promise<number> {
    const { _id } = await this.save(news);
    return _id;
  }

  async exists(filters: unknown): Promise<boolean> {
    return Boolean(await this.findOne(filters));
  }
}
