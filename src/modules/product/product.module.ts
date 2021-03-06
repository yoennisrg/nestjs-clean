import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductRepoProvider } from './database/product.provider';

import { CreateProductController } from './commands/create/create-product.controller';
import { CreateProductService } from './commands/create/create-product.service';
import { DeleteProductController } from './commands/delete/delete-product.controller';
import { DeleteProductService } from './commands/delete/delete-product.service';

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
