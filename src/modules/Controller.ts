import { Controller, Get, Query, Param, BadRequestException, Req, Body } from '@nestjs/common';
import { Paginate } from '@shin/models';
import { JWTPayload, IJWTPayload } from '@shin/modules';
import { toInteger, upperCase } from 'lodash';
import ProductSearchRequest from './dtos/search-product.request.dto';
import ProductsSearchElasticService from './ElasticService';
import ProductsSearchRedisService from './RedisService';
import { Service } from './Service';

 interface IProductPayload {
  readonly ean: string;
  readonly sku: string;
  readonly offset: number
  readonly limit: number
}
@Controller('products')
class ProductController {
  constructor(private readonly service: Service, 
    private readonly  elasticService: ProductsSearchElasticService, 
    private readonly  redisService: ProductsSearchRedisService) {}

  // /*
  //     GET PRICE FROM REDIS
  //     using context price
  // */
  @Get(':store/price')
  async findByprice(
    @Query() queryParams: IProductPayload,
    @Param('store') store: string,
    @JWTPayload() jwtPayload: IJWTPayload
  ) {
    if (!queryParams.ean) {
      throw new BadRequestException(`ean its a required param`);
    }
    
   
    const response = await this.service.getProductsByStore({
      store,
      ...queryParams,
      countryCode: upperCase(jwtPayload.countryCode)
    });
    return response;
  }

  @Get(':store')
  async findByStore(
    @Query() queryParams: IProductPayload,
    @Param('store') store: string,
    @JWTPayload() jwtPayload: IJWTPayload
  ) {   
    const response = await this.service.getAllByStore({
      store,
      ...queryParams,
      countryCode: upperCase(jwtPayload.countryCode)
    },{
      from:toInteger(queryParams.offset)
      ,size:toInteger(queryParams.limit)
    });
    return response;
  }

  // @Get(':store')
  // async search(
  //   @Param('store') store: string,
  //   @Query() request: ProductSearchRequest,
  //   @JWTPayload() jwtPayload: IJWTPayload
  // ) {   
   
  //   return await this.elasticService.search(Object.assign({ countryCode: jwtPayload.countryCode, store }, request))
  // }

  @Get()
  async search(
    @Query() request: ProductSearchRequest,
    @JWTPayload() jwtPayload: IJWTPayload
  ) {   
   
    return await this.elasticService.search(Object.assign({ countryCode: jwtPayload.countryCode }, request))
  }

  @Get(':requestId/updates')
  async findByRequestId(
    @Param('requestId') requestId: string,
  ) {   
   return await this.redisService.findByRequestId(requestId)
  }
}

export default ProductController;