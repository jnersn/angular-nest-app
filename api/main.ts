import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { PORT } from '@common';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule);
  app.enableCors();
  Promise.resolve(app.listen(PORT))
    .catch(e => console.debug(e))
}

(async (): Promise<void> => bootstrap())();
