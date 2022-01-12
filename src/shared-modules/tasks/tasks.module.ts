import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TasksService } from './tasks.service';
import { NewsModule } from '../../modules/news/news.module';

@Module({
  providers: [TasksService],
  imports: [NewsModule, HttpModule],
})
export class TaskSchedulingModule {}
