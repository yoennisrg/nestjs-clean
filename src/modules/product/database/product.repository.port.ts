import { Product } from './product.entity';
import { BaseRepositoryPort } from '../../../infrastructure/ports/repository.port';

export interface ProductRepositoryPort extends BaseRepositoryPort {
  findOneByNameOrThrow(name: string): Promise<Product>;
  findOneByIdOrThrow(id: string): Promise<Product>;
  create(command: unknown): Promise<number>;
  exists(fitler: unknown): Promise<boolean>;
  delete(id: string): Promise<Record<string, boolean | number>>;
}
