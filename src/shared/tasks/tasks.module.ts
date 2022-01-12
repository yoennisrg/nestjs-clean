import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TasksService } from './tasks.service';

@Module({
  providers: [TasksService],
  imports: [HttpModule],
})
export class TaskCronModule {}
