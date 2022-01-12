import { ApiProperty } from '@nestjs/swagger';
import { Query, Sort, Pagination } from '../interfaces/query.interface';

export class QueryOptions implements Query {
  constructor({ query, body }: any) {
    const { sortOrder, sortField, ...pagination } = query;
    this.filters = { ...(body && body) };
    this.sort = {
      ...(sortOrder && { order: sortOrder }),
      ...(sortField && { fields: sortField }),
    };
    this.pagination = { ...(pagination && pagination) };
  }

  filters: Record<string, any>;
  sort: Sort;
  pagination: Pagination;
}
