import { Provider } from '@nestjs/common';
import { FileRepository } from './file.repository';

export const FileRepoProvider: Provider = {
  provide: 'FileRepo',
  useClass: FileRepository,
};
