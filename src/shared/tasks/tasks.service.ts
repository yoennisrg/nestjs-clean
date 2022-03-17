import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval } from '@nestjs/schedule';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateDomianEvent } from '../../domain/events/domain.event';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class TasksService {
  constructor(
    private eventEmitter: EventEmitter2,
    private httpService: HttpService,
  ) {}

  private readonly logger = new Logger(TasksService.name);

  // @Cron('0 0 * * * *')
  // async handleCron() {
  //   this.httpService
  //     .get('https://hn.algolia.com/api/v1/search_by_date?query=nodejs')
  //     .subscribe(({ data }) => {
  //       this.logger.debug('Called every 1h');
  //       if (data.hits.length > 0) {
  //         this.eventEmitter.emit(
  //           'createNews.fetch',
  //           new CreateDomianEvent({
  //             objectID: data.nbHits,
  //             payload: data.hits,
  //           }),
  //         );
  //       }
  //     });
  // }

  // @Interval(10000)
  // handleInterval() {
  //   this.httpService
  //     .get('https://hn.algolia.com/api/v1/search_by_date?query=nodejs')
  //     .subscribe(({ data }) => {
  //       this.logger.debug('test external api query method every 10 seconds');
  //       if (data.hits.length > 0) {
  //         this.eventEmitter.emit(
  //           'createNews.fetch',
  //           new CreateDomianEvent({
  //             objectID: data.nbHits,
  //             payload: data.hits,
  //           }),
  //         );
  //       }
  //     });
  // }
}
