import { File } from './file.entity';
import { BaseRepositoryPort } from '../../../infrastructure/ports/repository.port';

export interface FileRepositoryPort extends BaseRepositoryPort {
  findOneByNameOrThrow(name: string): Promise<File>;
  findOneByIdOrThrow(id: string): Promise<File>;
  create(command: unknown): Promise<number>;
  exists(fitler: unknown): Promise<boolean>;
  delete(id: string): Promise<Record<string, boolean | number>>;
}
