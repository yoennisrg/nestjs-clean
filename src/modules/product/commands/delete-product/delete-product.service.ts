import { ProductRepositoryPort } from '../../database/product.repository.port';
import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { DeleteProductCommand } from './delete-product.command';

@CommandHandler(DeleteProductCommand)
export class DeleteProductService {
  constructor(
    @Inject('ProductRepo')
    private readonly productRepo: ProductRepositoryPort,
  ) {}

  async execute(command: DeleteProductCommand): Promise<void> {
    this.productRepo.findOneByIdOrThrow(command.id);
    this.productRepo.delete(command.id);
  }
}
