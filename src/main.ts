import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-Exception.filter';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';
import * as process from 'process';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';

async function bootstrap() {
  dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['verbose', 'error', 'warn', 'log'],
    // cors: true,
  });
  app.useStaticAssets(path.join(__dirname, './common', 'uploads'), {
    prefix: '/media',
  });
  // cors 설정
  app.enableCors();
  app.use(
    ['/docs/**', '/docs-json', '/api'],
    expressBasicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
      },
    }),
  );
  // swagger 설정
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs/api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.PORT);
}
bootstrap();
