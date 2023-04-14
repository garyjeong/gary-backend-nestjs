import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as path from 'path';

const app_env = process.env.APP_ENV;

dotenv.config({
  path: path.resolve(
    'envs',
    app_env || app_env === undefined ? '.env' : `.env.${app_env}`,
  ),
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app
    .listen(process.env.SERVICE_PORT)
    .then(() => console.log(`SERVICE START: ${process.env.SERVICE_PORT}`));
}
bootstrap();
