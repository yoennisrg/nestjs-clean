import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
// import * as mongoose from 'mongoose';
//mongoose.Types.ObjectId.isValid
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ValidateObjectId implements PipeTransform {
  async transform(value: string, metadata: ArgumentMetadata) {
    if (!isValidObjectId(value)) {
      throw new BadRequestException('Invalid ID!');
    }
    return value;
  }
}
