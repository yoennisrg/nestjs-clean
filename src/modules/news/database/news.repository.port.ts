import { News } from './news.entity';
import { BaseRepositoryPort } from '../../../infrastructure/ports/repository.port';

export interface NewsRepositoryPort extends BaseRepositoryPort {
  create(command: unknown): Promise<number>;
  exists(fitler: unknown): Promise<boolean>;
}
