import { Provider } from '@nestjs/common';
import { NewsRepository } from './news.repository';

export const NewsRepoProvider: Provider = {
  provide: 'NewsRepo',
  useClass: NewsRepository,
};
