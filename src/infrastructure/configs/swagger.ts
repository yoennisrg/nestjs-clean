import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

/**
 * Creates an OpenAPI document for an application, via swagger.
 * @param app the nestjs application
 * @returns the OpenAPI document
 */

export function createDocument(app: INestApplication): OpenAPIObject {
  const builder = new DocumentBuilder()
    .setTitle(process.env.swaggerTitle)
    .setDescription(process.env.swaggerDescription)
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .setVersion(process.env.swaggerVersion);

  for (const tag of process.env.swaggerTags) {
    builder.addTag(tag);
  }
  const options = builder.build();

  return SwaggerModule.createDocument(app, options);
}
