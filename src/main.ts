import { NestFactory } from '@nestjs/core';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { createDocument } from './infrastructure/configs/swagger';
import { API } from './infrastructure/constants/api.version';
import { exceptionFactory } from './infrastructure/pipe/exception.factory';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  SwaggerModule.setup('api/swagger', app, createDocument(app));

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: exceptionFactory,
    }),
  );
  app.setGlobalPrefix(API.VersionV1);
  await app.listen(3000);
}
bootstrap();
