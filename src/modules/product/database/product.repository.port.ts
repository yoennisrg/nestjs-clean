import { Product } from './product.entity';
import { RepositoryPort } from '../../../domain/ports/repository.port';
import { CreateProductCommand } from '../commands/create-product.command';

export interface ProductRepositoryPort extends RepositoryPort {
  findOneByNameOrThrow(name: string): Promise<Product | undefined>;
  create(command: CreateProductCommand): Promise<Product>;
}
