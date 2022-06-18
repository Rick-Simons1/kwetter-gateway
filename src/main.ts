import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:4200',
      'https://ashy-pebble-0272e8b03.1.azurestaticapps.net',
    ],
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(4000);
}
bootstrap();
