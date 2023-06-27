import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { config } from './shared/';
import { readHttpsOptions } from './app';
import { corsOptions } from './app/config';

const setupSwagger = (app: INestApplication, path: string): void => {
  const config = new DocumentBuilder()
    .setTitle('Questions Book')
    .setDescription('API for Questions Book')
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(path, app, document);
};

const bootstrap = async (): Promise<void> => {
  const httpsOptions = config.SSL() ? readHttpsOptions() : undefined;
  const app = await NestFactory.create(AppModule, {
    cors: corsOptions,
    httpsOptions,
  });

  if (config.isDev()) setupSwagger(app, 'docs');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(config.get('PORT'));
};

bootstrap();
