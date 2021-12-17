import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductRepoProvider } from './database/product.provider';

import { CreateProductController } from './commands/create-product/create-product.controller';
import { DeleteProductController } from './commands/delete-product/delete-product.controller';

import { CreateProductService } from './commands/create-product/create-product.service';
import { DeleteProductService } from './commands/delete-product/delete-product.service';

import { Product, ProductSchema } from './database/product.entity';

const httpControllers = [CreateProductController, DeleteProductController];
const dependencesControllers = [CreateProductService, DeleteProductService];

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [...httpControllers],
  providers: [...dependencesControllers, ProductRepoProvider],
})
export class ProductModule {}
