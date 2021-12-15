import { Provider } from '@nestjs/common';
import { ProductRepository } from './product.repository';

export const ProductRepoProvider: Provider = {
  provide: 'ProductRepo',
  useClass: ProductRepository,
};
