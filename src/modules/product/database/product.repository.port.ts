import { Product } from './product.entity';
import { BaseRepositoryPort } from '../../../domain/ports/repository.port';
import { CreateProductCommand } from '../commands/create-product/create-product.command';

export interface ProductRepositoryPort extends BaseRepositoryPort {
  findOneByNameOrThrow(name: string): Promise<Product>;
  findOneByIdOrThrow(id: string): Promise<Product>;
  create(command: CreateProductCommand): Promise<number>;
  exists(name: string): Promise<boolean>;
  delete(id: string): Promise<void>;
}
