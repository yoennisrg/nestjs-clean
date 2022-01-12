import { QueryOptions } from '../../../infrastructure/interface-adapters/dtos/query.options.dto';

export class FindNewsQuery extends QueryOptions {
  constructor(props: any) {
    super(props);
  }
}
