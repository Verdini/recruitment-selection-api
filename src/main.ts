import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

/**
 * Server Application entry point.
 */
async function bootstrap() {
  // Temporary disable for using without a SSL certification
  // Remember to not use in production
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

  // Server setup
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.disable('x-powered-by');
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');

  // Open API
  const options = new DocumentBuilder()
    .setTitle('Recruitment and Selection API v1')
    .setDescription('The R&S API description')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/v1/docs', app, document);

  // Start server
  await app.listen(process.env.PORT || 8080);
}
bootstrap();
