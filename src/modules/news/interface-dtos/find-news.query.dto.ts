import { PaginationDto } from '../../../infrastructure/utils/mongoose-paginate';
export class FindNewsQuery extends PaginationDto {
  constructor(props: any) {
    super(props);
  }
}
