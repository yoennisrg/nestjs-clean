import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteProductService } from './delete-product.service';
import { DeleteProductCommand } from './delete-product.command';

@Controller('product')
export class DeleteProductController {
  constructor(private readonly service: DeleteProductService) {}

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.service.execute(new DeleteProductCommand(id));
  }
}
