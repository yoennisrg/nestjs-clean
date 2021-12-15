import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { EntityRepositoryBase } from '../../../infrastructure/database/entity.repository';
import { Product, ProductDocument } from '../database/product.entity';

@Injectable()
export class ProductRepository extends EntityRepositoryBase<ProductDocument> {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {
    super(productModel);
  }

  async findOneByNameOrThrow(name: string): Promise<void> {
    const found = this.productModel.findOne({ name: name });
    if (found) {
      throw new NotFoundException(
        `A product with that name: ${name} already exists`,
      );
    }
  }

  async create(product: Product): Promise<Product> {
    const newProduct = new this.productModel(product);
    return await newProduct.save();
  }
}
