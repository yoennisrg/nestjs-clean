import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval } from '@nestjs/schedule';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { NewsCreatedEvent } from '../../modules/news/events/created-news.event';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class TasksService {
  constructor(
    private eventEmitter: EventEmitter2,
    private httpService: HttpService,
  ) {}

  private readonly logger = new Logger(TasksService.name);

  @Cron('0 0 * * * *')
  handleCron() {
    this.logger.debug('Called every 1h');
  }

  @Interval(10000)
  async handleInterval() {
    this.httpService
      .get('https://hn.algolia.com/api/v1/search_by_date?query=nodejs')
      .subscribe(({ data }) => {
        this.logger.debug('Called every 10 seconds');
        if (data.hits.length > 0) {
          this.eventEmitter.emit(
            'createNews.fetch',
            new NewsCreatedEvent({
              objectID: data.nbHits,
              payload: data.hits,
            }),
          );
        }
      });
  }
}
