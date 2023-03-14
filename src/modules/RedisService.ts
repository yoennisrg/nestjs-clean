import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RedisInstance } from '@shin/databases';

@Injectable()
export default class ProductsSearchRedisService{
    constructor(@Inject('RedisService') private readonly redisService: RedisInstance) {}

    findByRequestId = async (requestId: string): Promise<any> => {
      const keyRequestId = `REQUEST_ID:${requestId}`;

      const result = await this.redisService.get(keyRequestId);

      if(result == null){
         throw new NotFoundException(`Request ${requestId} not found`)
      }
      return JSON.parse(result)
    }

}