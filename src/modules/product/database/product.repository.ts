import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '../../../infrastructure/database/base.repository';
import { Product, ProductDocument } from '../database/product.entity';

@Injectable()
export class ProductRepository extends BaseRepository<ProductDocument> {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {
    super(productModel);
  }

  async findOneByNameOrThrow(name: string): Promise<Product> {
    const product = await this.findOne({ name: name });
    if (!product) {
      throw new NotFoundException(`No product with that id was found: ${name}`);
    }
    return product;
  }

  async findOneByIdOrThrow(id: string): Promise<Product> {
    const product = await this.findOne({ id });
    if (!product) {
      throw new NotFoundException(`${id} does not exist`);
    }
    return product;
  }

  async create(product: Product): Promise<number> {
    const { _id } = await this.save(product);
    return _id;
  }

  async exists(name: string): Promise<boolean> {
    const found = await this.findOne({ name: name });
    if (found) {
      return true;
    }
    return false;
  }

  async delete(id: string): Promise<void> {
    await this.deleteOne({ _id: new Types.ObjectId(id) });
  }
}
