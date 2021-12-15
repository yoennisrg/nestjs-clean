import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { CreateProductCommand } from './create-product.command';
// import { ProductResponse } from '../dtos/product.response.dto';
import { ProductRepositoryPort } from '../database/product.repository.port';

@CommandHandler(CreateProductCommand)
export class CreateProductService {
  constructor(
    @Inject('ProductRepo')
    private readonly productRepo: ProductRepositoryPort,
  ) {}

  async execute(command: CreateProductCommand): Promise<any> {
    await this.productRepo.findOneByNameOrThrow(command.name);
    return await this.productRepo.create(command);
  }
}
