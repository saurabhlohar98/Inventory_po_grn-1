// backend/src/main.ts

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as process from 'process';

async function bootstrap() {
const app = await NestFactory.create(AppModule);
app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
await app.listen(port);
console.log(`Server started on http://localhost:${port}`);
}
bootstrap();
