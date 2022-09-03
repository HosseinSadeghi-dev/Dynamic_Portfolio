import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as config from 'config'


async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  // const serverConfig = config.get('server');
  app.setGlobalPrefix('api');
  app.enableCors();

  const options = new DocumentBuilder()
      .setTitle('Dynamic Portfolio')
      .setDescription('Dynamic Portfolio Backend API')
      .setVersion('1.0.0')
      .addBearerAuth()
      .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  // const port = process.env.PORT || serverConfig.port;
  const port = process.env.PORT || config.get('server.port');
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
