import { Inject } from '@nestjs/common';
import { NewsRepositoryPort } from '../../database/news.repository.port';
import { FindNewsQuery } from '../../interface-dtos/find-news.query.dto';

export class FindNewsService {
  constructor(
    @Inject('NewsRepo')
    private readonly newsRepo: NewsRepositoryPort,
  ) {}

  async execute(query: FindNewsQuery): Promise<unknown> {
    return await this.newsRepo.paginate(query);
  }
}
