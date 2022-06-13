import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: ['content-type'],
    origin: [
      'http://localhost:4200',
      'https://ashy-pebble-0272e8b03.1.azurestaticapps.net',
    ],
  });
  await app.listen(4000);
}
bootstrap();
