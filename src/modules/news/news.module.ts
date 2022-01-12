import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { News, NewsSchema } from './database/news.entity';
import { NewsRepoProvider } from './database/news.provider';
import { NewsCreatedListener } from './commands/create/create-news.listener';

import { CreateNewsController } from './commands/create/create-news.controller';
import { CreateNewsService } from './commands/create/create-news.service';

const httpControllers = [CreateNewsController];
const dependencesControllers = [CreateNewsService];

@Module({
  imports: [
    MongooseModule.forFeature([{ name: News.name, schema: NewsSchema }]),
  ],
  controllers: [...httpControllers],
  providers: [...dependencesControllers, NewsRepoProvider, NewsCreatedListener],
  exports: [NewsCreatedListener, ...dependencesControllers],
})
export class NewsModule {}
