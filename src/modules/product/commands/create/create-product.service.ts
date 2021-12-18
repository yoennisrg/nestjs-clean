import { Inject, ConflictException } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { CreateProductCommand } from './create-product.command';
import { ProductRepositoryPort } from '../../database/product.repository.port';

@CommandHandler(CreateProductCommand)
export class CreateProductService {
  constructor(
    @Inject('ProductRepo')
    private readonly productRepo: ProductRepositoryPort,
  ) {}

  async execute(command: CreateProductCommand): Promise<number> {
    if (await this.productRepo.exists({ name: command.name })) {
      throw new ConflictException(`${command.name} already exists`);
    }
    return await this.productRepo.create(command);
  }
}
