import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infrastructure/configs/ormconfig';
import { ScheduleModule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TaskCronModule } from './shared/tasks/tasks.module';
import { ProductModule } from './modules/product/product.module';
import { NewsModule } from './modules/news/news.module';
import { TripsModule } from './modules/trips/trips.module';
import { FileModule } from './modules/files/file.module';

@Module({
  imports: [
    // TaskCronModule,
    // ProductModule,
    // NewsModule,
    // TripsModule,
    FileModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule.forRoot(),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
