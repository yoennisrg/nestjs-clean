import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileRepoProvider } from './database/file.provider';

import { CreateFileController } from './commands/create/create-file.controller';
import { CreateFileService } from './commands/create/create-file.service';

import { File, FileSchema } from './database/file.entity';

const httpControllers = [CreateFileController];
const dependencesControllers = [CreateFileService];

@Module({
  imports: [
    MongooseModule.forFeature([{ name: File.name, schema: FileSchema }]),
  ],
  controllers: [...httpControllers],
  providers: [...dependencesControllers, FileRepoProvider],
})
export class FileModule {}
