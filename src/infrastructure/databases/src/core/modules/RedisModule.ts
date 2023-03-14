import { DynamicModule, FactoryProvider, Inject, Injectable, ModuleMetadata } from '@nestjs/common';
import { Module } from '@nestjs/common';
import IORedis, { Redis, RedisOptions } from 'ioredis';

export const RedisKey = 'RedisService';

type RedisModuleOptions = {
  connectionOptions: RedisOptions;
  ready: (client: Redis) => void;
};

type RedisAsyncModuleOptions = {
  useFactory: (
    ...args: any[]
  ) =>  RedisModuleOptions;
} & Pick<ModuleMetadata, 'imports'> &
  Pick<FactoryProvider, 'inject'>;



  @Injectable()
  export class RedisService {
    client: Redis
    constructor(
       @Inject(RedisKey) redis: Redis
    ) {
      this.client = redis;
  }
  }
  
    
  @Module({
      providers: [RedisService],
      exports: [RedisService]
    })
export class RedisModule {
  static registerAsync({
    useFactory,
    imports,
    inject,
  }: RedisAsyncModuleOptions): DynamicModule {
    const redisProvider = {
      provide: RedisKey,
      useFactory: (...args: any) => {
        const { connectionOptions, ready } =  useFactory(...args);

        const client = new IORedis(connectionOptions);
        ready(client);

        return client;
      },
      inject,
    };

    return {
      module: RedisModule,
      imports,
      providers: [redisProvider],
      exports: [redisProvider],
    };
  }
}
