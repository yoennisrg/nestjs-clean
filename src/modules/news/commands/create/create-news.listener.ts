import { CreateNewsService } from './create-news.service';
import { CreateNewsCommand } from './create-news.command';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NewsCreatedEvent } from '../../events/created-news.event';

@Injectable()
export class NewsCreatedListener {
  constructor(private readonly service: CreateNewsService) {}

  @OnEvent('createNews.fetch')
  create(event: NewsCreatedEvent): void {
    event.payload.length > 0 &&
      [...event.payload].forEach(async (hits: any) => {
        await this.service.execute(
          new CreateNewsCommand({
            title: hits.title,
            url: hits.url,
            author: hits.author,
            points: hits.points,
            storyText: hits.story_text,
            commentText: hits.comment_text,
            numComments: hits.num_comments,
            storyId: hits.story_id,
            storyTitle: hits.story_title,
            storyUrl: hits.story_url,
            parentId: hits.parent_id,
            createdAtI: hits.created_at_i,
            tags: hits._tags,
            objectID: hits.objectID,
            highlightResult: hits._highlightResult,
          }),
        );
      });
  }
}
