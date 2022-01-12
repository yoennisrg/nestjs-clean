type OrderType = 'ASC' | 'DESC';

export interface Query {
  filters?: Record<string, string>;
  sort?: Sort;
  pagination?: Pagination;
}

export interface Sort {
  order?: OrderType;
  fields?: string | string[];
}

export interface Pagination {
  skip?: number;
  limit?: number;
}
