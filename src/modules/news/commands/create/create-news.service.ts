import { Inject, ConflictException } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { CreateNewsCommand } from './create-news.command';
import { NewsRepositoryPort } from '../../database/news.repository.port';

@CommandHandler(CreateNewsCommand)
export class CreateNewsService {
  constructor(
    @Inject('NewsRepo')
    private readonly newsRepo: NewsRepositoryPort,
  ) {}

  async execute(command: CreateNewsCommand): Promise<number> {
    if (await this.newsRepo.exists({ objectID: command.objectID })) {
      throw new ConflictException(`${command.objectID} already exists`);
    }
    return await this.newsRepo.create(command);
  }
}
