import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateProductController } from './commands/create-product.controller';
import { ProductRepoProvider } from './database/product.provider';
import { CreateProductService } from './commands/create-product.service';

import { Product, ProductSchema } from './database/product.entity';

const httpControllers = [CreateProductController];

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [...httpControllers],
  providers: [CreateProductService, ProductRepoProvider],
})
export class ProductModule {}
