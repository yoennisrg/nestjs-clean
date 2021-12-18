import { ProductRepositoryPort } from '../../database/product.repository.port';
import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { DeleteProductCommand } from './delete-product.command';

@CommandHandler(DeleteProductCommand)
export class DeleteProductService {
  constructor(
    @Inject('ProductRepo')
    private readonly productRepo: ProductRepositoryPort,
  ) {}

  async execute(
    command: DeleteProductCommand,
  ): Promise<Record<string, boolean | number>> {
    if (await this.productRepo.exists({ _id: command.id })) {
      return await this.productRepo.delete(command.id);
    } else {
      throw new NotFoundException(`${command.id} does not exist`);
    }
  }
}
