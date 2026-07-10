import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';

import { AppModule } from './app.module';
import { getCorsOptions } from './config/cors.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(getCorsOptions());

  if (process.env.NODE_ENV !== 'production') {
    const options = new DocumentBuilder()
      .setTitle('ICAT PMU Service')
      .setDescription('ICAT PMU API')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(parseInt(process.env.PORT));
}
bootstrap();
