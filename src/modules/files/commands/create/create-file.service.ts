import { Inject, ConflictException } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { CreateFileCommand } from './create-file.command';
import { FileRepositoryPort } from '../../database/file.repository.port';

@CommandHandler(CreateFileCommand)
export class CreateFileService {
  constructor(
    @Inject('FileRepo')
    private readonly fileRepo: FileRepositoryPort,
  ) {}

  async execute(command: CreateFileCommand): Promise<number> {
    if (await this.fileRepo.exists({ name: command.name })) {
      throw new ConflictException(`${command.name} already exists`);
    }
    return await this.fileRepo.create(command);
  }
}
