import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteProductService } from './delete-product.service';
import { DeleteProductCommand } from './delete-product.command';
import { ValidateObjectId } from '../../../../infrastructure/pipe/object.id.pipe';

@Controller('product')
export class DeleteProductController {
  constructor(private readonly service: DeleteProductService) {}

  @Delete('/:id')
  async delete(@Param('id', new ValidateObjectId()) id: string): Promise<void> {
    await this.service.execute(new DeleteProductCommand(id));
  }
}
