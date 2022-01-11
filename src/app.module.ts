import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infrastructure/configs/ormconfig';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskSchedulingModule } from './shared-modules/tasks/tasks.module';
import { ProductModule } from './modules/product/product.module';
import { NewsModule } from './modules/news/news.module';

@Module({
  imports: [
    TaskSchedulingModule,
    ProductModule,
    NewsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule.forRoot(),
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
