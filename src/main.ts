import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';

import { AppModule } from './app.module';
import { createDocument } from './infrastructure/configs/swagger';
import { API } from './infrastructure/constants/api.version';
import { exceptionFactory } from './infrastructure/pipe/exception.factory';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  SwaggerModule.setup('api/swagger', app, createDocument(app));

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: exceptionFactory,
    }),
  );
  app.setGlobalPrefix(API.VersionV1);
  await app.listen(3000);
}
bootstrap();
