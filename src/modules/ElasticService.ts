import { BadRequestException, Injectable } from '@nestjs/common';
import { ElasticsearchService, } from '@nestjs/elasticsearch';
import { ElasticTools } from '@shin/utils';
import { has } from 'lodash';
import ProductSearchRequest from './dtos/search-product.request.dto';

@Injectable()
export default class ProductsSearchElasticService{
  constructor(private readonly elasticService: ElasticsearchService) {}

  
   search = async ({ limit, offset, ...payload }: ProductSearchRequest) => {
    try {
       const query = ElasticTools.queryBuilder(ElasticTools.productSchema, payload) as any
       const fromLimit = Number(limit || 10);
        const sizeOffset = Number(offset || 0);


        const result = await this.elasticService.search({
          index: 'products',
          from: sizeOffset,
          size: fromLimit,
          body: {
            ...query
          }
        })
        const hits: any = result.hits;
        const totalElements = hits.total.value;
        const totalPages = totalElements > fromLimit ? Math.ceil(totalElements / fromLimit) : totalElements > 0 ? 1 : 0;

        const items = hits.hits.map((item: any) => {
            const { properties: { price, store, ...props } , ...base }: any = item._source

            if(has(store, payload.store)){
              props['store'] = {
                ...store[payload.store]
              }
            }

            if(has(price, payload.store)){
              props['price'] = {
                ...price[payload.store]
              }
            }

            return { ...base, properties: props }
        });
        
        return {items, offset: sizeOffset, limit: fromLimit, totalPages, totalElements}
        
    } catch (error) {
        throw new BadRequestException(`[ProductsSearchService]: ${error.message}`);
    }
  }
}