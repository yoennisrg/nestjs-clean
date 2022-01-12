import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { News, NewsSchema } from './database/news.entity';
import { NewsRepoProvider } from './database/news.provider';
import { CreateNewsListener } from './commands/create/create-news.listener';

import { CreateNewsController } from './commands/create/create-news.controller';
import { CreateNewsService } from './commands/create/create-news.service';
import { FindNewsController } from './queries/find-news/find-news.controller';
import { FindNewsService } from './queries/find-news/find-news.service';

const httpControllers = [CreateNewsController, FindNewsController];
const dependencesControllers = [CreateNewsService, FindNewsService];

@Module({
  imports: [
    MongooseModule.forFeature([{ name: News.name, schema: NewsSchema }]),
  ],
  controllers: [...httpControllers],
  providers: [...dependencesControllers, NewsRepoProvider, CreateNewsListener],
})
export class NewsModule {}
